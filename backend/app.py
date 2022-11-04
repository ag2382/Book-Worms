from flask import Flask, send_from_directory, request
from flask_cors import CORS

app = Flask(__name__, static_folder="../build", static_url_path="/")

CORS(app, origin="*")

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path

if __name__=="__main__":
    app.run(host="localhost", port="8080", debug=True)