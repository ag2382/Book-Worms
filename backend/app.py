from flask import Flask, send_from_directory, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import os

app = Flask(__name__, static_folder="../build", static_url_path="/")

app.config['MYSQL_USER'] = 'b54c4a3f725cac'
app.config['MYSQL_PASSWORD'] = 'c9cf936a'
app.config['MYSQL_HOST'] = 'us-cdbr-east-06.cleardb.net'
app.config['MYSQL_DB'] = 'heroku_f6468b727c70c8d'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql=MySQL(app)

CORS(app, origin="*")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print("Catch all.", path)
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(os.path.join(app.static_folder), path)
    else:
        return send_from_directory(os.path.join(app.static_folder),'index.html')

@app.errorhandler(404)
def page_not_found(e):
    """When there's a 404 error, return to the main page."""
    print("Page not found.", e)
    return send_from_directory(app.static_folder, "index.html")

if __name__=="__main__":
    app.run(host="localhost", port="8080", debug=True)