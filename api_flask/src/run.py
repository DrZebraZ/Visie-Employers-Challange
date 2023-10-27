import os
from dotenv import load_dotenv
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../', '.env'))
env = load_dotenv(dotenv_path)

from api.__init__ import app

port = os.getenv('PORT')

if not port:
  port = 3002

if __name__=="__main__": 
  app.run(host='0.0.0.0', port=port)
  print("RUNNING")