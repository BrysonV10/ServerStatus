ServerStatus serverconfig.json Reference
=======================================
The config file currently supports two objects: **mc-servers** and **terraria-servers**

Object mc-servers will contain an array of objects formatted as **Minecraft** servers.    
Minecraft Object Format:
```
"name": <*The name of the server, will be displayed on the website. Type: String. Required*>,   
"ip": <*IP Address of the server. If using a domain, be sure to add port with : after the domain. Type String. Required*>,   
"hideIp": <*To hide the IP address/domain from the website. If this is turned on, the IP address will not be sent from the API. Type Boolean. Required*>,   
"isPrivate": <*Toggles the Public/Private indicator on the website. Purely for show, but if this is turned on, the IP address will be hidden by default. Type Boolean. Required*>,    
"maintenanceMsg": <*Show a message if the server is under maintenance. Will show even if the server is online, so make sure to remove it if the server goes online. Fill with null when not being used. Type String/Null. Required*>,    
"websocket": <*Indicates if you would like to use LiveView on this server. Type Boolean. Required*>,     
"websocketip": <*ONLY required if websocket == true. Must include ws:// or wss:// in the domain/IP. Type String. Optional. Read more about this below.*>     
```

Object terraria-servers will contain an array of objects formatted as **Terraria** servers.    
Terraria Object Format
```
{
"name": <*The Name of the server, will be shown on the website. Type String. Required*>, 
"ip": <*The IP of the server. Must include the port in the IP or port 7777 will be assumed. Type String. Required*>,
"hideIp": <*If you want to hide the IP/Domain of the server on the website. Type Boolean. Required*>,
"maintenanceMsg": <*Display a message on the website showing the status of a server. If you don't want a message to show, set it to null. Type: String/Null. Required*>,
"usingTshock": <*If you are using TShock, a modded server platform. Set this to true. If this does not exist, we will assume it is false. Type Boolean. Optional*>,
"tshockUrl": "<*If you are using TShock, this is the URL of the REST API that we use to get status. Include http:// and a trailing /. Type String. Optional (Required if using a TShock server).*>"
 }
```

Example Configuration *(All URLs/IPs are invalid and dummy info)*
```
{
  "mc-servers": [
    {
      "name": "Lifesteal",
      "ip": "1.1.1.1:8112",
      "hideIp": true,
      "isPrivate": false,
      "maintenanceMsg": null,
      "websocket": true,
      "websocketip": "wss://2.2.2.2"
    },
    {
      "name": "Vanilla Java",
      "ip": "3.3.3.3:4494",
      "hideIp": true,
      "isPrivate": true,
      "maintenanceMsg": "Currently being updated!",
      "websocket": false
    }
  ],
  "terraria-servers": [
    {
      "name": "Terraria Test Server", 
      "ip": "9.9.9.9",
      "hideIp": true,
      "maintenanceMsg": null
    },
    {
      "name": "TShock Server", 
      "ip": "terraria.server.tk",
      "hideIp": true,
      "maintenanceMsg": null,
      "usingTshock": true,
      "tshockUrl": "api.terraria.server.tk"
    }
  ]
}


```
