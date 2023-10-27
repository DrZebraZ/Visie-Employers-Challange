from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from .routes import userRoutes

load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(userRoutes, url_prefix="/employee")