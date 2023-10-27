from flask import Blueprint, jsonify, request
from .components.userComponent import UserComponent
from .data.userRepository import UserRepository
from .utils.result_validation import ResultValidation
from .data.databaseConnector import DatabaseConnector

userRoutes = Blueprint('userRoutes',__name__)



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
      return message, status
    
  elif resultValidation.isResultEmpty():
      status = 204
      return jsonify("Result Empty"), status
  
  elif status == 200 or 201:
    message = resultValidation.getResult()
  
  return jsonify(message), status



@userRoutes.route('/create', methods=['POST'])
def createUser():
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.createUser(
    request.json.get('nome'),
    request.json.get('cpf'),
    request.json.get('rg'),
    request.json.get("data_nascimento"),
    request.json.get('data_admissao'),
    request.json.get('funcao'), 
    resultValidation
  )
  return applyResult(resultValidation, 201)



@userRoutes.route('/all', methods=['GET'])
def getAllUsers():
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.getAll(resultValidation)
  return applyResult(resultValidation, 200)
    
    
    
@userRoutes.route('/<id_pessoa>', methods=['GET'])
def getUnique(id_pessoa):
  print(id_pessoa)
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.getUnique(id_pessoa, resultValidation)
  return applyResult(resultValidation, 200)



@userRoutes.route('/delete/<id_pessoa>', methods=['DELETE'])
def delete(id_pessoa):
  print(id_pessoa)
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.delete(id_pessoa, resultValidation)
  return applyResult(resultValidation, 200)



@userRoutes.route('/update/<id_pessoa>', methods=['PUT'])
def edit(id_pessoa):
  userComponent = UserComponent(UserRepository(DatabaseConnector()))
  resultValidation = ResultValidation()
  userComponent.edit(
    id_pessoa,
    request.json.get('nome'),
    request.json.get('cpf'),
    request.json.get('rg'),
    request.json.get("data_nascimento"),
    request.json.get('data_admissao'),
    request.json.get('funcao'), 
    resultValidation
  )
  return applyResult(resultValidation, 200)