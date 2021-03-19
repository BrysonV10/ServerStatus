from flask import Flask, render_template, jsonify
import psutil, datetime
version = 0.3
app = Flask(__name__, static_folder="static")
booted_at_time = "March 18, 8:52pm"
@app.route('/')
def index():
  return render_template('index.html', booted_at=booted_at_time)

@app.route("/cpu")
def cpu():
  cpu = psutil.cpu_percent(1)
  print(cpu)
  return jsonify(cpu=str(cpu), version=version)


app.run(host='0.0.0.0')