from flask import Flask, send_from_directory, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import os
from decouple import config
import mysql.connector

app = Flask(__name__, static_folder="../build", static_url_path="/")

connection = mysql.connector.connect(host=config('HOST'),
                                         database=config('DB'),
                                         user=config('USER'),
                                         password=config('PASSWORD'))

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

@app.route("api/club/create/<str: user_id>", methods=['POST'])
def new_club(user_id):

    book_title = request.args.get('book_title')
    book_desc = request.args.get('book_desc')
    book_img = request.args.get('book_img', default="")
    club_name = request.args.get('club_name')
    club_desc = request.args.get('club_desc')
    cursor = connection.cursor()
    query = f'INSERT INTO CLUB (club_name, description) VALUES({club_name}, {club_desc})'
    query2 = f'INSERT INTO BOOK(book_name, book_desc, book_img) VALUES({book_title}, {book_desc},{book_img})'


@app.route("api/club/join/<str: user_id>/<int: club_id>", methods=['POST']) 
def new_user(user_id, club_id):
    query=f'INSERT INTO club_members(club_id, memeber_id, owner) VALUES({club_id},{user_id}, {0})'

@app.route("api/clubs/add_book/<int: club_id>", methods=["POST"])
def new_book(club_id):
    book_title = request.args.get('book_title')
    book_desc = request.args.get('book_desc')
    book_img = request.args.get('book_img', default="")
    query = f'INSERT INTO BOOK(club_id, book_name, book_desc, book_img) VALUES({club_id}, {book_title}, {book_desc},{book_img})'

@app.route("api/clubs/post_review/<str: user_id>/<int: club_id>/<int: book_id>", methods=["POST"])
def new_review(user_id,club_id, book_id, member_id):
    review = request.args.get('review')
    rating = request.args.get('rating')
    query=f"INSERT INTO review(book_id, clubid, review_txt, member_id, rating) VALUES({user_id},{book_id},{club_id},{review}, {member_id}, {rating})"

@app.route("api/club/<int: club_id>", methods=['GET'])
def get_club(club_id):
    club = 'SELECT * FROM CLUB WHERE club_id = int'
    return {"dictionary"}

@app.route("api/club/most_joined", methods=["GET"])
def most_joined():
    members = f"SELECT * FROM  COUNT(member_id) ORDER BY COUNT(member_id)" 
    return ("")

@app.route("api/clubs/user/<str: user_id", methods=["GET"])
def users(user_id):
    query=f"SELECT * FROM club_members "

@app.errorhandler(404)
def page_not_found(e):
    """When there's a 404 error, return to the main page."""
    print("Page not found.", e)
    return send_from_directory(app.static_folder, "index.html")

if __name__=="__main__":
    app.run(host="localhost", port="8080", debug=True)