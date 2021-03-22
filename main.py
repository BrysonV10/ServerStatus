from flask import Flask, render_template, jsonify
import psutil, datetime, subprocess, random
version = 0.3
app = Flask(__name__, static_folder="static")
booted_at_time = "March 18, 8:52pm"
server_ID = random.randint(0, 99999)
@app.route('/')
def index():
  OS_Info = subprocess.run(["cat", "/etc/os-release"],stdout=subprocess.PIPE)
  
  OS_Info = OS_Info.stdout.decode('utf-8')
  print(OS_Info)
  return render_template('index.html', booted_at=booted_at_time)

@app.route("/cpu")
def cpu():
  cpu = psutil.cpu_percent(1)
  try:
    sensors = psutil.sensors_temperatures()
    cpu_temps = sensors['cpu-thermal'][0]
    print(cpu_temps)
  except Exception:
    cpu_temps = "None"
  #print(cpu)
  return jsonify(cpu=str(cpu), version=version, cpu_temp=cpu_temps, servID=server_ID)

app.run(host='0.0.0.0')