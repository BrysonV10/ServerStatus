from flask import Flask, render_template, jsonify
import psutil

app = Flask(__name__, static_folder="static")

@app.route('/')
def index():
  return render_template('index.html')

@app.route("/cpu")
def cpu():
  cpu = psutil.cpu_percent(1)
  print(cpu)
  return jsonify(cpu=str(cpu))
app.run(host='0.0.0.0')