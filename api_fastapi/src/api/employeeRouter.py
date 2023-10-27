from fastapi import APIRouter
from fastapi.responses import JSONResponse
from .data.userRepository import UserRepository
from .utils.result_validation import ResultValidation
from .components.userComponent import UserComponent, Employee
from .data.databaseConnector import DatabaseConnector


employeeRoutes = APIRouter()

def applyResult(resultValidation, status):
  status = status
  message= "Intenal Error"
  if (resultValidation.hasError()):
    if (resultValidation.hasCriticalError()):
      status=500
      message="Intenal Error"
      print(f"ERROR STACK: {resultValidation.getErrorList()} - status: {status}")
    else:
      status = 400
      print(resultValidation.getErrorList()[0])
      message = resultValidation.getErrorList()[0]
      print(f"ERROR STACK: {resultValidation.getErrorList()} - status: {status}")
      return JSONResponse(content=message, status_code=status) 
    
  elif resultValidation.isResultEmpty():
      status = 204
      return JSONResponse(content="Result Empty", status_code=status)
  
  elif status == 200 or 201:
    message = resultValidation.getResult()
  
  return JSONResponse(content=message, status_code=status) 

@employeeRoutes.get('/all')
def getALL():
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.getAll(resultValidation)
  return applyResult(resultValidation, 200)
  
  
@employeeRoutes.get('/{id_pessoa}')
def getUnique(id_pessoa:str):
  print(id_pessoa)
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.getUnique(id_pessoa, resultValidation)
  return applyResult(resultValidation, 200)
  
  
@employeeRoutes.post('/create')
def createUser(employee: Employee):
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.createUser(employee, resultValidation)
  return applyResult(resultValidation, 201)


@employeeRoutes.delete('/delete/{id_pessoa}')
def delete(id_pessoa:str):
  print(id_pessoa)
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.delete(id_pessoa, resultValidation)
  return applyResult(resultValidation, 200)

@employeeRoutes.put('/update/{id_pessoa}')
def edit(id_pessoa:str, employee: Employee):
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.edit(id_pessoa, employee, resultValidation)
  return applyResult(resultValidation, 200)
