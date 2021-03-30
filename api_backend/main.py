from flask import Flask, jsonify, request, Response, render_template
from datetime import datetime
import psutil, subprocess, random #can you see this?
version = 0.3
app = Flask(__name__)
booted_at_time = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
server_ID = random.randint(0, 99999)
connectedClients = []
@app.route('/')
def index():
  return jsonify(valid=False, debug="Use a different path")

@app.route("/init", methods=["GET", "POST"])
def init():
  if(request.method == "POST"):
    try:
      print(request.get_json())
      client_id = request.form["clientID"]
    except Exception as e:
      print(e)
      return Response(status=400)
    print("POST")
    print(client_id)
    connectedClients.append(client_id)
    return jsonify(id=server_ID)
  elif(request.method == "GET"):
    return "404 Not Found"

@app.route("/currentstats", methods=["GET"])
def currentstats():
  print("stats")
  try:
    client_id = request.form["clientID"]
  except Exception as e:
    client_id = None
    print(e)
  print(connectedClients)
  if client_id == None or client_id not in connectedClients:
    print("No good")
    return Response(status=401)
  
  try:
    cpu = psutil.cpu_percent(1)
  except Exception:
    cpu = None
  try:
    sensors = psutil.sensors_temperatures(fahrenheit=True)
    cpu_temps = sensors['cpu-thermal'][0]
  except Exception:
    cpu_temps = None
  return jsonify(cpu=str(cpu), version=version, cpu_temp=cpu_temps, servID=server_ID)

@app.route("/jimmeeeees_stuff/<page_id>")
def jimmeeeees_stuff(page_id):
  if page_id == "dfjsdlkfjsldkf":
    return render_template("../jimmies.html")

app.run(host='0.0.0.0')
