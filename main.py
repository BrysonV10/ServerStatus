import flask, os, json, subprocess, datetime, random, threading, pickledb, time
from minecraftStatus import minecraftServerLoader
from stats import getStats
import logging
from terrariaStatus import loadTerrariaServers
version = 0.8
app = flask.Flask(__name__, static_folder="static")
booted_at_time = datetime.datetime.now()
server_ID = random.randint(11111, 99999)
db = pickledb.load("data.db", False)



@app.route('/')
def index():
  return "Pong"

#On Load Only
@app.route("/setup")
def setup():
  OS_Info = subprocess.run(["cat","/etc/issue.net"],stdout=subprocess.PIPE)
  OS_Info = OS_Info.stdout.decode('utf-8')
  Computer_Info = {"OSInfo": OS_Info, "ComputerName": Computer_Name, "UserName": User_Name, "bootTime": booted_at_time}
  res = flask.jsonify(ComputerInfo=Computer_Info, version=version)
  response = flask.make_response(res)
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response




@app.route("/stats")
def statsRoute():
  while db.get("stats") == False:
    time.sleep(1)
  res = db.get("stats")
  response = flask.make_response(flask.jsonify(res))
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response



if __name__ == '__main__':
  #CONFIG INFO
  User_Name = os.environ["USER"]
  loadedServers = minecraftServerLoader()
  terrariaServers = loadTerrariaServers()
  f = open("serverconfig.json")
  data = json.load(f)
  f.close()
  try:
    Computer_Name = data["general"]["computerNickname"]
  except Exception:
    Computer_Name = "Not Configured"
  try:
    CacheTime = data["general"]["cacheTime"]
  except Exception:
    CacheTime = 15
  try:
    FlaskPort = data["general"]["flaskPort"]
  except Exception:
    FlaskPort = 5000
  del data
  log = logging.getLogger('werkzeug')
  log.setLevel(logging.ERROR)
  th = threading.Thread(target=getStats, args=[loadedServers, terrariaServers, server_ID, db, CacheTime])
  th.start()
  app.run(host='0.0.0.0', port=FlaskPort)


