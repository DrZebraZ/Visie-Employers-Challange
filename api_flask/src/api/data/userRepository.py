

class UserRepository:
  def __init__(self, databaseConnector):
    self.databaseConnector = databaseConnector
  
  
  
  def create(self, nome, cpf, rg, data_nascimento, data_admissao, funcao, resultValidation):
    try:
      response = self.databaseConnector.execute(f"""
      insert into pessoas (
        nome, 
        cpf, 
        rg, 
        data_nascimento, 
        data_admissao, 
        funcao
      ) values (%s,%s,%s,%s,%s,%s
      )""",
      [nome, cpf, rg, data_nascimento, data_admissao, funcao])
      
      resultValidation.setResult(response)
      print(response)
    except Exception as e:
      resultValidation.addError("RepositoryError", f"CreateUser - {e}")
      print(e)
      return resultValidation
      
      
      
  def getAll(self, resultValidation):
    try:
      response = self.databaseConnector.execute(f"""
        select id_pessoa, nome, data_admissao from pessoas                                          
      """, [])
      resultValidation.setResult(response)
      
    except Exception as e:
      resultValidation.addError("RepositoryError", f"getALL - {e}")
      print(e)
      return resultValidation
    
    
    
  def getUnique(self, id_pessoa, resultValidation):
    try:
      response = self.databaseConnector.execute(f"""
        select * from pessoas where id_pessoa = %s                                 
      """, [id_pessoa])
      resultValidation.setResult(response)
      
    except Exception as e:
      resultValidation.addError("RepositoryError", f"getALL - {e}")
      print(e)
      return resultValidation
  
  
  
  def delete(self, id_pessoa, resultValidation):
    try:
      response = self.databaseConnector.execute(f"""
        delete from pessoas where id_pessoa = %s                                 
      """, [id_pessoa])
      resultValidation.setResult(response)
      
    except Exception as e:
      resultValidation.addError("RepositoryError", f"getALL - {e}")
      print(e)
      return resultValidation
    
    
    
  def edit(self, id_pessoa, nome, cpf, rg, data_nascimento, data_admissao, funcao, resultValidation):
    try:
      response = self.databaseConnector.execute(f"""
      update pessoas set
        nome = %s, 
        cpf = %s, 
        rg = %s, 
        data_nascimento = %s, 
        data_admissao = %s, 
        funcao = %s
      where id_pessoa = %s""",
      [nome, cpf, rg, data_nascimento, data_admissao, funcao, id_pessoa])
      resultValidation.setResult(response)
      
    except Exception as e:
      resultValidation.addError("RepositoryError", f"Edit - {e}")
      print(e)
      return resultValidation