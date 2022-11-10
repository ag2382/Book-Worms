from flask import Flask, send_from_directory, request
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../build", static_url_path="/")

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