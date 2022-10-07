FROM node:16-alpine as build-step
WORKDIR /app

COPY ./frontend/package.json ./
COPY ./frontend/src ./src
COPY ./frontend/public ./public
RUN npm install
RUN npm run build

FROM python:3.9
WORKDIR /app
COPY --from=build-step /app/build ./build

RUN mkdir ./api
COPY ./backend ./api
RUN pip install -r ./api/requirements.txt

EXPOSE $PORT

WORKDIR /app/api
CMD ["gunicorn", "app:app"]