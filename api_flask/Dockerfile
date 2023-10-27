FROM python:3.10

WORKDIR /usr/app

COPY ./api_flask ./api_flask

WORKDIR /usr/app/api_flask

RUN pip install -r requirements.txt --disable-pip-version-check

EXPOSE 3001

CMD ["python", "src/run.py"]

# docker build -t visie:api_flask -f ./api_flask/Dockerfile . 
# docker run --restart always --ip 0.0.0.0 -p 3001:3001 visie:api_flask