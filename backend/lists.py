import requests 
from secrets import BOOK_API_KEY
url = "https://api.nytimes.com/svc/books/v3/lists.json"

concat = f"{url}?list-name=hardcover-fiction&api-key={BOOK_API_KEY}"
r=requests.get(concat)
print('Response Code:', r.status_code)
print('Response Headers:\n', r.headers)
print('Response Content:\n', r.text)