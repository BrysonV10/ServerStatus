import psutil, subprocess, time
from flask import jsonify
def getStats(minecraftServers, terrariaServers, serverID, db, waitTime):
  while True:
    result = _getStats(minecraftServers, terrariaServers, serverID)
    db.set("stats", result)
    time.sleep(waitTime)

def _getStats(minecraftServers, terrariaServers, serverID):
  cpu = psutil.cpu_percent(1)

  #disks
  disks = psutil.disk_partitions()
  total = 0
  used = 0
  for disk in disks:
    usage = psutil.disk_usage(disk.mountpoint)
    total += usage.total
    used += usage.used
#ram
  ramTotal = int(psutil.virtual_memory().total)
  ramUsed = int(ramTotal - psutil.virtual_memory().available)
#CPU Temps
  try:
    sensors = psutil.sensors_temperatures()
    cpu_temps = sensors['cpu-thermal'][0]
    print(cpu_temps)
  except Exception:
    cpu_temps = "None"
  #CPU info
  result = subprocess.run(['lscpu'], stdout=subprocess.PIPE)
  cpuInfo = result.stdout.decode('UTF-8')
  cpuInfoArr = cpuInfo.split('\n')
  cpuInfo = cpuInfoArr[12].split(" ")
  res = []
  for ele in cpuInfo:
    if ele.strip():
        res.append(ele)
  cpuInfo = " ".join(res)
  cpuInfo = cpuInfo[cpuInfo.find(":")+2:]
  

  #Minecraft Servers
  class Players:
    def __init__(self):
      self.online = None
      self.max= None
  #MINECRAFT
  class OfflineStatus:
    def __init__(self):
      self.online = False
      self.players = Players()
      self.version = None

  minecraftInfo = []
  for server in minecraftServers:
    try:
      status = server.status()
      setattr(status, "online", True)
      servversion = status.version.name
    except Exception:
      status = OfflineStatus()
      servversion = None
    if server.isPrivate or server.hideIp:
      ip = None
    else:
      ip = server.ip
    
    serverObj = {"name": server.serverNickname, "maxPlayers": status.players.max, "onlinePlayers": status.players.online, "ip": ip, "isPrivate": server.isPrivate, "online": status.online, "maintenance": server.maintenanceMsg, "version": servversion, "websocket": server.websocket, "websocketip": server.websocketip}
    minecraftInfo.append(serverObj)

  #Terraria Servers
  terrariaStats = []
  for server in terrariaServers:
    terrariaStats.append(server.status())
  

  #Response format
  res = {
    "cpu":cpu, 
    "cpu_temp":cpu_temps, 
    "servID":serverID, 
    "usedDisk":used, 
    "totalDisk":total, 
    "totalRam":ramTotal, 
    "usedRam":ramUsed, 
    "cpuInfo":cpuInfo, 
    "minecraftInfo": minecraftInfo, "terrariaInfo":terrariaStats
  }
  return res
  
