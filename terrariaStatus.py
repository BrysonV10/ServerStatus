import json, socket, time, requests

#Create Terraria Server class for storing info and testing connection (returns true/false)
class TerrariaServer():
  def __init__(self, ip, name, toHideIp, maintenanceMsg):
    if ip.find(":") != -1:
      #Actual domain name
      self.port = ip[ip.find(":")+1:]
      self.ip = ip[:ip.find(":")]
    else:
      #assume domain name
      self.ip = ip
      self.port = 7777
    self.name = name
    self.hideip = toHideIp
    self.maintainence = maintenanceMsg

  def status(self):
    if self.hideip:
      ip = None
    else:
      ip = self.ip + ":" + str(self.port)
    responseObj = {"type": "vanilla", "online": None, "name": self.name, "ip": ip, "maintenance": self.maintainence}
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(3)
    try:
      result = s.connect_ex((self.ip, int(self.port)))
      if result == 0:
        responseObj["online"] = True
      else:
        responseObj["online"] = False
      s.close()
      return responseObj
    except Exception:
      responseObj["online"] = False
      return responseObj

    
class TShockServer:
  def __init__(self, ip, name, toHideIp, maintenanceMsg, tshockurl ):
    if ip.find(":") != -1:
      #Actual domain name
      self.port = ip[ip.find(":")+1:]
      self.ip = ip[:ip.find(":")]
    else:
      #assume domain name
      self.ip = ip
      self.port = 7777
    self.name = name
    self.hideip = toHideIp
    self.maintainence = maintenanceMsg
    self.statusIP = tshockurl

  def status(self):
    offlineStatus = {
    "type": "modded",
    "status": "503",
    "name": self.name,
    "serverversion": None,
    "tshockversion": {
      "Major": None,
      "Minor": None,
      "Build":  None,
      "Revision": None,
      "MajorRevision": None,
      "MinorRevision": None
    },
    "port": None,
    "playercount": None,
    "maxplayers": None,
    "world": None,
    "uptime": None,
    "serverpassword": None
    }
    try:
      r = requests.get(self.statusIP + "status")
      r = r.json()
      r["type"] = "modded"
      r["name"] = self.name
      if self.hideip:
        r["port"] = None
    except requests.exceptions.ConnectionError:
      r = offlineStatus
    return r

def loadTerrariaServers():
  jsonFile = open("serverconfig.json", "r")
  file = json.load(jsonFile)
  jsonFile.close()
  servers = []
  for server in file["terraria-servers"]:
    try:
      isTshock = server["usingTshock"]
    except Exception:
      isTshock = False
    serverClass = None
    if isTshock:
      serverClass = TShockServer(server["ip"], server["name"], server["hideIp"], server["maintenanceMsg"], server["tshockUrl"])
    else:
      serverClass = TerrariaServer(server["ip"], server["name"], server["hideIp"], server["maintenanceMsg"])
    servers.append(serverClass)
  return servers

  