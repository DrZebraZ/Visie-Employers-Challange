from datetime import datetime
from dateutil import parser
from pydantic import BaseModel, constr

class Employee(BaseModel):
  nome: constr(min_length=3)
  cpf: constr(min_length=11)
  rg: constr(min_length=9)
  data_nascimento: constr(min_length=3)
  data_admissao: constr(min_length=3)
  funcao:constr(min_length=1)

class UserComponent:
  def __init__(self, userRepository):
    self.__repository = userRepository
  
  
  
  def createUser(self, employee: Employee, resultValidation):
    try:
      self.__repository.create(
        employee.nome, 
        employee.cpf, 
        employee.rg, 
        self.transformStrData(employee.data_nascimento), 
        self.transformStrData(employee.data_admissao), 
        employee.funcao, 
        resultValidation)
      if(not resultValidation.isResultEmpty()):
        resultValidation.setResult("Created!")
      return resultValidation
    except Exception as e:
      print(e)
      resultValidation.addError("HANDLE_FAILED", f"CreateUser - {e}")
      return resultValidation
  
  
  
  def getAll(self, resultValidation):
    try:
      self.__repository.getAll(resultValidation)
      result = resultValidation.getResult()['data']
      formattedResult = []
      for val in result:
        nome = val[1].split(' ')[0]
        formattedResult.append({
          "id_pessoa":val[0],
          "nome":nome,
          "data_admissao":self.transformDateStr(val[2])
        })
      resultValidation.setResult(formattedResult)
    except Exception as e:
      print(e)
      resultValidation.addError("HANDLE_FAILED", f"GetAllUsers - {e}")
      return resultValidation
    
    
    
  def getUnique(self, id_pessoa, resultValidation):
    try:
      self.__repository.getUnique(id_pessoa, resultValidation)
      if not resultValidation.getResult()['data']:
        resultValidation.addError("NOT_FOUND", "Usuário não encontrado.")
        return
      result = resultValidation.getResult()['data'][0]
      formattedResult = {
        "id_pessoa":result[0],
        "nome":result[1],
        "rg":result[2],
        "cpf":result[3],
        "data_nascimento":self.transformDateStr(result[4]),
        "data_admissao":self.transformDateStr(result[5]),
        "funcao":result[6]
      }
      return resultValidation.setResult(formattedResult)
      
    except Exception as e:
      print(e)
      resultValidation.addError("HANDLE_FAILED", f"GetUnique - {e}")
      return resultValidation
    
    
    
  def delete(self, id_pessoa, resultValidation):
    try:
      self.__repository.delete(id_pessoa, resultValidation)
      result = resultValidation.getResult()
      resultValidation.setResult("Deletado!")
    except Exception as e:
      print(e)
      resultValidation.addError("HANDLE_FAILED", f"Delete - {e}")
      return resultValidation
    
    
    
  def edit(self, id_pessoa, employee:Employee, resultValidation):
    try:
      self.getUnique(id_pessoa, resultValidation)
      if resultValidation.hasError():
        return
      self.__repository.edit(
        id_pessoa, 
        employee.nome, 
        employee.cpf, 
        employee.rg, 
        self.transformStrData(employee.data_nascimento),
        self.transformStrData(employee.data_admissao),
        employee.funcao, 
        resultValidation)
      
      resultValidation.setResult("Editado!")
    except Exception as e:
      print(e)
      resultValidation.addError("HANDLE_FAILED", f"Edit - {e}")
      return resultValidation    
    
    
    
  def transformStrData(self, data):
    data_datetime = parser.isoparse(data)  # Removing 'Z' at the end
    data_formatted = data_datetime.strftime('%Y-%m-%d %H:%M:%S')
    return data_formatted
  
  
  
  def transformDateStr(self, data):
    data_formatada = data.strftime('%d/%m/%Y')
    return data_formatada
  