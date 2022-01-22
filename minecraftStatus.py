from mcstatus import MinecraftBedrockServer
from mcstatus import MinecraftServer
#TODO: Add bedrock support
import json
def minecraftServerLoader():
  f = open("serverconfig.json")
  mcData = json.load(f)
  f.close()
  servers = mcData["mc-servers"]
  mcClasses = []
  # Edit MinecraftServer (Or MinecraftBedrockServer) class with serverNickname, hideIp, isPrivate, ip, websocket, websocketip, and maintenanceMsg
  for server in servers:
    lookupIp = server["ip"]
    serverObj = MinecraftServer.lookup(lookupIp)
    setattr(serverObj, "serverNickname", server["name"])
    setattr(serverObj, "hideIp", server["hideIp"])
    setattr(serverObj, "isPrivate", server['isPrivate'])
    setattr(serverObj, "maintenanceMsg", server['maintenanceMsg'])
    setattr(serverObj, "ip", server['ip'])
    setattr(serverObj, "websocket", server["websocket"])
    if server["websocket"] == True:
      setattr(serverObj, "websocketip", server["websocketip"])
    else:
      setattr(serverObj, "websocketip", None)
    #add to array
    mcClasses.append(serverObj)
  return mcClasses





