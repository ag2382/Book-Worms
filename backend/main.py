import requests 
from secrets import BOOK_API_KEY
url = "https://api.nytimes.com/svc/books/v3/lists.json"
# headers = {
#     'Accepts': 'application/json', 'api-key': BOOK_API_KEY, 'LIST_TYPE': 
# }
concat = f"https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key={BOOK_API_KEY}"
r=requests.get(concat)
print('Response Code:', r.status_code)
print('Response Headers:\n', r.headers)
print('Response Content:\n', r.text)