if __name__=="__main__":
  from dotenv import load_dotenv
  import os

  load_dotenv()

  import uvicorn
  uvicorn.run("api:app", host="0.0.0.0", port=int(os.getenv("PORT")), reload=True)