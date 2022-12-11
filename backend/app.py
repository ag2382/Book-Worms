#TODO USE AUTH0 API TO ADD NAMES TO USER IDs
from flask import Flask, send_from_directory, request
from flask_cors import CORS
import os
from decouple import config
import mysql.connector

app = Flask(__name__, static_folder="../build", static_url_path="/")

def connect():
    return mysql.connector.connect(host=config('HOST'),
                                    database=config('DB'),
                                    user=config('DB_USER'),
                                    password=config('PASSWORD'))

CORS(app, origin="*")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print("Catch all.", path)
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(os.path.join(app.static_folder), path)
    else:
        return send_from_directory(os.path.join(app.static_folder),'index.html')

@app.route("/api/club/create/<string:user_id>", methods=["POST"]) # TESTED
def new_club(user_id):
    """Adds a new club."""

    if request.method == "POST":
        club_name = request.args.get('club_name')
        club_desc = request.args.get('club_desc')

        connection = connect()
        cursor = connection.cursor()

        query = "INSERT INTO club (club_name, description, owner_id) VALUES(%s, %s, %s);"
        cursor.execute(query, (club_name, club_desc, user_id))
        cursor.close()

        query = "INSERT INTO club_members (member_id, club_num)  VALUES (%s, (SELECT LAST_INSERT_ID()));"
            
        cursor = connection.cursor()
        cursor.execute(query,  [user_id])

        connection.commit()
        connection.close()
        return "Success", 201


@app.route("/api/clubs/join/<string:user_id>/<int:club_id>", methods=["POST"]) #TESTED
def new_user(user_id, club_id):
    """Adds a new user to a club."""

    if request.method == "POST":
        connection = connect()
        cursor = connection.cursor()

        query = "INSERT INTO club_members(club_num, member_id) VALUES(%s, %s);"
        cursor.execute(query, (club_id, user_id))

        connection.commit()
        cursor.close()
        connection.close()
        return "Success", 201


@app.route("/api/clubs/add_book/<int:club_id>", methods=["POST"]) #TESTED
def new_book(club_id):
    """Adds a new book for discussion in a club."""

    if request.method == "POST":
        book_title = request.args.get('book_title')
        book_desc = request.args.get('book_desc')
        book_img = request.args.get('book_img', default="")

        connection = connect()
        cursor = connection.cursor()

        query = "INSERT INTO BOOK(club_id, book_name, book_desc, book_imgs) VALUES(%s, %s, %s, %s);"
        cursor.execute(query, (club_id, book_title, book_desc, book_img))

        connection.commit()
        cursor.close()
        connection.close()
        return "Success", 201

@app.route("/api/clubs/post/review/<string:user_id>/<int:club_id>/<int:book_id>", methods=["POST"]) #TESTED
def new_review(user_id, club_id, book_id):
    """Adds a new review for a book in a club."""

    if request.method == "POST":
        review = request.args.get('review')
        rating = request.args.get('rating')

        connection = connect()
        cursor = connection.cursor()

        query = "INSERT INTO review(book_id, club_id, review_txt, member_id, rating) VALUES(%s, %s, %s, %s, %s);"
        cursor.execute(query, (book_id, club_id, review, user_id, rating))

        connection.commit()
        cursor.close()
        connection.close()
        return "Success", 201

@app.route("/api/clubs/user/<string:member_id>", methods=["GET"]) # TESTED
def users(member_id):
    """Fetches all of the user's joined clubs."""

    if request.method == "GET":
        out = {"clubs": []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM club_members WHERE member_id=%s;"
        cursor.execute(query, [member_id])
        results = cursor.fetchall()

        cursor.close()
        connection.close()

        for result in results:
            out["clubs"].append(
                {"id": result[1], "member_id": result[0]}
            )

        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/discussion/<int:club_id>", methods=["GET"]) # TESTED
def get_discussions(club_id):
    """Fetches all discussion in a club."""

    if request.method == "GET":
        out = {"discussions":  []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM book WHERE club_id=%s ORDER BY book_id;"
        cursor.execute(query, [club_id])
        results = cursor.fetchall()
        
        for result in results:
            out["discussions"].append(
                {"name": result[0], "club_id": result[1], "start_date": result[2], "desc": result[3], "id": result[4], "img": result[5]}
            )

        cursor.close()
        connection.close()
        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/get/review/<int:book_id>", methods=["GET"]) # TESTED
def get_reviews(book_id):
    """Fetches all reviews for a discussion."""

    if request.method == "GET":
        out = {"reviews": []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM review WHERE book_id=%s ORDER BY datetime;"
        cursor.execute(query, [book_id])
        results = cursor.fetchall()

        for result in results:
            out["reviews"].append(
                {"book_id": result[0], "club_id": result[1], "review": result[2], "member_id": result[3], "rating": result[4], "date": result[5]}
            )

        cursor.close()
        connection.close()

        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/latest", methods=["GET"]) # TESTED
def latest():
    """Fetches all of the latest created clubs."""

    if request.method == "GET":
        out = {"clubs": []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM club ORDER BY start_date LIMIT 5;"
        cursor.execute(query)
        results = cursor.fetchall()

        cursor.close()
        connection.close()

        for result in results:
            out["clubs"].append(
                {"id": result[0], "name": result[1], "desc": result[2], "start": result[3], "owner": result[4]}
            )

        return out, 200, {'ContentType':'application/json'}

# @app.route("/api/clubs/most_joined", methods=["GET"])
# def most_joined():
#     """Fetches all of the most joined clubs."""

#     connection = connect()
#     cursor = connection.cursor()

#     query=f"SELECT * FROM club  ORDERED BY start_date;"
#     cursor.execute(query)
#     results = cursor.fetchall()

#     cursor.close()
    # connection.close()

@app.errorhandler(404)
def page_not_found(e):
    """When there's a 404 error, return to the main page."""
    print("Page not found.", e)
    return send_from_directory(app.static_folder, "index.html")

if __name__=="__main__":
    app.run(host="localhost", port="8080", debug=True)