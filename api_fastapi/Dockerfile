FROM python:3.10

WORKDIR /usr/app

COPY ./api_fastapi ./api_fastapi

WORKDIR /usr/app/api_fastapi

RUN pip install -r requirements.txt --disable-pip-version-check

EXPOSE 3001

CMD ["python", "src/main.py"]

# docker build -t visie:api_fastapi -f ./api_fastapi/Dockerfile . 
# docker run --restart always --ip 0.0.0.0 -p 3001:3001 visie:api_fastapi