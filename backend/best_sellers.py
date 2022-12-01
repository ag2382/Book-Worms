import requests 
from decouple import config
url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json"
key = config('BOOK_API_KEY')
concat = f"{url}?age-group=&author=&contributor=&isbn=&offset=&price=&publisher=&title=&api-key={key}"
r=requests.get(concat)
print('Response Code:', r.status_code)
print('Response Headers:\n', r.headers)
print('Response Content:\n', r.text)