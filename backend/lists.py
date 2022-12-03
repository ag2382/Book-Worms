import requests
import json
from decouple import config
key = config('BOOK_API_KEY')
url = "https://api.nytimes.com/svc/books/v3/lists.json"
concat = f"{url}?list-name=hardcover-fiction&api-key={key}"
r=requests.get(concat)

# print('Response Code:', r.status_code)
# print('Response Headers:\n', r.headers)
# print('Response Content:\n', r.text)    # one long string

# book_metadata = r.text[6]
# print('buddy:\n', book_metadata)

# print("\n")
data = r.json()
# print(data)
# sample - TITLE + DESC.
