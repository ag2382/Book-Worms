import lists
import mysql.connector
from decouple import config

db = mysql.connector.connect(
    host=config("HOST"),
    user=config("USER"),
    password=config("PASSWORD"),
    database=config("DB")
)

mycursor = db.cursor()

# SQL OPERATIONS

# mycursor.execute("CREATE TABLE Books (title VARCHAR(50), description VARCHAR(1000), author VARCHAR (50), publisher VARCHAR (50))")
# mycursor.execute("TRUNCATE TABLE Books")

info = lists.data

for k, v in info.items():     # go through JSON object
    if k == 'results':        # look for book results
        # print(v)
        for x in v:
            for a, b in x.items():
                if a == 'book_details':
                    # print(b)
                    for dict_item in b:
                        entries = {}
                        for k, v in dict_item.items():
                            if k == 'title' or k == 'description' or k == 'author' or k == 'publisher':
                                entries[k] = v
                        # sql = "INSERT INTO Books (title, description, author, publisher) VALUES (%s, %s, %s, %s)"
                        # mycursor.execute(sql, list(entries.values()))
                        # db.commit()
            # print(x)

mycursor.execute("SELECT * FROM Books")

for x in mycursor:
    print(x)