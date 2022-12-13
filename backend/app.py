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

    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(os.path.join(app.static_folder), path)
    else:
        return send_from_directory(os.path.join(app.static_folder),'index.html')

@app.route("/api/club/create", methods=["POST"]) # TESTED
def new_club():
    """Adds a new club."""

    if request.method == "POST":
        data = request.get_json()
        user_id = data['user_id']
        club_name = data['club_name']
        club_desc = data['club_desc']

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


@app.route("/api/clubs/join/<int:club_id>", methods=["POST"]) #TESTED
def new_user(club_id):
    """Adds a new user to a club."""

    if request.method == "POST":
        data = request.get_json()
        user_id = data["user_id"]

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
        data = request.get_json()
        book_title = data["book_title"]
        book_desc = data["book_desc"]
        book_img = ""
        if "book_img" in data:
            book_img = data["book_img"]

        connection = connect()
        cursor = connection.cursor()

        query = "INSERT INTO BOOK(club_id, book_name, book_desc, book_imgs) VALUES(%s, %s, %s, %s);"
        cursor.execute(query, (club_id, book_title, book_desc, book_img))

        connection.commit()
        cursor.close()
        connection.close()
        return "Success", 201

@app.route("/api/clubs/post/review/<int:club_id>/<int:book_id>", methods=["POST"]) #TESTED
def new_review(club_id, book_id):
    """Adds a new review for a book in a club."""

    if request.method == "POST":
        data = request.get_json()
        user_id = data["user_id"]
        review = data["review"]
        rating = data["rating"]
        username = data["username"]

        connection = connect()
        cursor = connection.cursor()

        query = "INSERT INTO review(book_id, club_id, review_txt, member_id, rating, member_username) VALUES(%s, %s, %s, %s, %s, %s);"
        cursor.execute(query, (book_id, club_id, review, user_id, rating, username))

        connection.commit()
        cursor.close()
        connection.close()
        return "Success", 201

@app.route("/api/clubs/user", methods=["GET"]) # TESTED
def users():
    """Fetches all of the user's joined clubs."""

    if request.method == "GET":
        user_id = request.args.get('user_id')
        out = {"clubs": []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT club.club_id, club.club_name, club.description, club.start_date, club.owner_id  FROM club_members JOIN club ON club_members.club_num=club.club_id WHERE club_members.member_id=%s;"
        cursor.execute(query, [user_id])
        results = cursor.fetchall()

        cursor.close()
        connection.close()

        for result in results:
            out["clubs"].append(
                {"id": result[0], "name": result[1], "desc": result[2], "date": result[3], "owner": result[4]}
            )

        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/discussion/<int:club_id>", methods=["GET"]) # TESTED
def get_discussions(club_id):
    """Fetches all discussion in a club."""

    if request.method == "GET":
        out = {"discussions":  []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM book WHERE club_id=%s ORDER BY book_id DESC;"
        cursor.execute(query, [club_id])
        results = cursor.fetchall()
        
        for result in results:
            out["discussions"].append(
                {"name": result[0], "club_id": result[1], "start_date": result[2], "desc": result[3], "id": result[4], "img": result[5]}
            )

        cursor.close()
        connection.close()
        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/info/<int:club_id>", methods=["GET"]) # TESTED
def get_club_info(club_id):
    """Fetches club info."""

    if request.method == "GET":
        out = {}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM club WHERE club_id=%s;"
        cursor.execute(query, [club_id])
        result = cursor.fetchone()
        
        out["info"] = {"id": result[0], "name": result[1], "desc": result[2], "start": result[3], "owner": result[4]}

        cursor.close()
        connection.close()
        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/book/info/<int:book_id>", methods=["GET"]) # TESTED
def get_book_info(book_id):
    """Fetches club info."""

    if request.method == "GET":
        out = {}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM book WHERE book_id=%s;"
        cursor.execute(query, [book_id])
        result = cursor.fetchone()
        
        out["info"] = {"name": result[0], "club_id": result[1], "date": result[2], "desc": result[3], "id": result[4], "img": result[5]}

        cursor.close()
        connection.close()
        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/club_members/<int:club_id>", methods=["GET"]) # TESTED
def get_club_members(club_id):
    """Fetches all club members in a club."""

    if request.method == "GET":
        out = {"members":  []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM club_members WHERE club_num=%s;"
        cursor.execute(query, [club_id])
        results = cursor.fetchall()
        
        for result in results:
            out["members"].append(
                {"id": result[0], "club_id": result[1]}
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
                {"book_id": result[0], "club_id": result[1], "review": result[2], "member_id": result[3], "rating": result[4], "date": result[5], "username": result[6]}
            )

        cursor.close()
        connection.close()

        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/search", methods=["GET"]) # TESTED
def get_clubs_search():
    """Fetches all clubs matching substring."""

    if request.method == "GET":
        user_id = request.args.get('user_id')
        search = request.args.get('search', default="")
        out = {"clubs": []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM club WHERE club_name LIKE %s ORDER BY start_date DESC;"
        cursor.execute(query, ["%"+search+"%"])
        club_results = cursor.fetchall()
        cursor.close()

        cursor = connection.cursor()
        query = "SELECT club_num FROM club_members WHERE member_id=%s"
        cursor.execute(query, [user_id])
        results = cursor.fetchall()
        club_member_results = []
        for club in results:
            club_member_results.append(club[0])

        cursor.close()
        connection.close()

        for result in club_results:
            joined = 0
            if result[0] in club_member_results:
                joined = 1

            out["clubs"].append(
                {"id": result[0], "name": result[1], "desc": result[2], "start": result[3], "owner": result[4], "joined": joined}
            )

        return out, 200, {'ContentType':'application/json'}

@app.route("/api/clubs/latest", methods=["GET"]) # TESTED
def latest():
    """Fetches all of the latest created clubs."""

    if request.method == "GET":
        user_id = request.args.get('user_id')
        out = {"clubs": []}

        connection = connect()
        cursor = connection.cursor()

        query = "SELECT * FROM club ORDER BY start_date DESC LIMIT 5;"
        cursor.execute(query)
        club_results = cursor.fetchall()
        cursor.close()

        cursor = connection.cursor()
        query = "SELECT club_num FROM club_members WHERE member_id=%s"
        cursor.execute(query, [user_id])
        results = cursor.fetchall()
        club_member_results = []
        for club in results:
            club_member_results.append(club[0])

        cursor.close()
        connection.close()

        for result in club_results:
            joined = 0
            if result[0] in club_member_results:
                joined = 1

            out["clubs"].append(
                {"id": result[0], "name": result[1], "desc": result[2], "start": result[3], "owner": result[4], "joined": joined}
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
    return send_from_directory(app.static_folder, "index.html")

if __name__=="__main__":
    app.run(host="localhost", port="8080", debug=True)