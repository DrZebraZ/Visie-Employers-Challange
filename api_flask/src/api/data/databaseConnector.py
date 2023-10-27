import mysql.connector
from mysql.connector import Error
import os

class DatabaseConnector:
  def __init__(self):
    self.connect()
      
      
      
  def connect(self):
    try:
      self.connection = mysql.connector.connect(
        host=os.getenv('DATABASE_HOST'),
        database=os.getenv('DATABASE_NAME'),
        user=os.getenv('DATABASE_USER'),
        password=os.getenv('DATABASE_PASSWORD'),
        port=os.getenv('DATABASE_PORT')                                          
      )
      if self.connection.is_connected():
        db_info = self.connection.get_server_info()
        print("Connected to MYSQL Server version: ", db_info)
        
    except Error as e:
      print("Error while connecting to MYSQL: ", e)

    
    
  def execute(self, query,params):
    try:
      if not self.connection.is_connected():
        self.connect()
      
      cursor = self.connection.cursor()
      cursor.execute(query,params)
      record = cursor.fetchall()

    except Error as e:
      self.connection.rollback()
      cursor.close()
      self.connection.close()
      return
      
    finally:
      self.connection.commit()
      cursor.close()
      return record
      