from flask import Flask, send_from_directory, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import os
from decouple import config
import mysql.connector

app = Flask(__name__, static_folder="../build", static_url_path="/")

def connect():
    return mysql.connector.connect(host=config('HOST'),
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

@app.route("/api/club/create/<str: user_id>", methods=['POST'])
def new_club(user_id):
    """Adds a new club."""

    club_name = request.args.get('club_name')
    club_desc = request.args.get('club_desc')

    connection = connect()
    cursor = connection.cursor()

    query = f"INSERT INTO club (club_name, description, owner_id) VALUES({club_name}, {club_desc}, {user_id}) RETURNING; INSERT INTO club_members (member_id, club_id)  VALUES ({user_id}, (SELECT LAST_INSERT_ID()));"
    cursor.execute(query)

    cursor.close()
    connection.close()


@app.route("/api/clubs/join/<str: user_id>/<int: club_id>", methods=["POST"]) 
def new_user(user_id, club_id):
    """Adds a new user to a club."""

    connection = connect()
    cursor = connection.cursor()

    query = f"INSERT INTO club_members(club_id, member_id) VALUES({club_id},{user_id});"
    cursor.execute(query)

    cursor.close()
    connection.close()

@app.route("/api/clubs/add_book/<int: club_id>", methods=["POST"])
def new_book(club_id):
    """Adds a new book for discussion in a club."""

    book_title = request.args.get('book_title')
    book_desc = request.args.get('book_desc')
    book_img = request.args.get('book_img', default="")

    connection = connect()
    cursor = connection.cursor()

    query = f"INSERT INTO BOOK(club_id, book_name, book_desc, book_img) VALUES({club_id}, {book_title}, {book_desc},{book_img});"
    cursor.execute(query)

    cursor.close()
    connection.close()

@app.route("/api/clubs/post/review/<str: user_id>/<int: club_id>/<int: book_id>", methods=["POST"])
def new_review(user_id,club_id, book_id, member_id):
    """Adds a new review for a book in a club."""
    
    review = request.args.get('review')
    rating = request.args.get('rating')

    connection = connect()
    cursor = connection.cursor()

    query=f"INSERT INTO review(book_id, clubid, review_txt, member_id, rating) VALUES({user_id},{book_id},{club_id},{review}, {member_id}, {rating});"
    cursor.execute(query)

    cursor.close()
    connection.close()

@app.route("/api/clubs/user/<str: user_id", methods=["GET"])
def users(user_id):
    """Fetches all of the user's joined clubs."""

    connection = connect()
    cursor = connection.cursor()

    query = f"SELECT * FROM club_members "
    cursor.execute(query)

@app.route("/api/clubs/discussion/<int: club_id>", methods=["GET"])
def get_discussions(club_id):
    """Fetches all discussion in a club."""

@app.route("/api/clubs/get/review/<int: club_id>/<int: book_id>")
def get_reviews(club_id, book_id):
    """Fetches all reviews for a discussion."""

@app.route("/api/clubs/latest", methods=["GET"])
def latest():
    """Fetches all of the latest created clubs."""

    connection = connect()
    cursor = connection.cursor()

    query=f"SELECT * FROM club  ORDERED BY start_date;"
    cursor.execute(query)
    results = cursor.fetchall()

    cursor.close()
    connection.close()

@app.route("/api/clubs/most_joined", methods=["GET"])
def most_joined():
    """Fetches all of the most joined clubs."""

    connection = connect()
    cursor = connection.cursor()

    query=f"SELECT * FROM club  ORDERED BY start_date;"
    cursor.execute(query)
    results = cursor.fetchall()

    cursor.close()
    connection.close()



@app.errorhandler(404)
def page_not_found(e):
    """When there's a 404 error, return to the main page."""
    print("Page not found.", e)
    return send_from_directory(app.static_folder, "index.html")

if __name__=="__main__":
    app.run(host="localhost", port="8080", debug=True)