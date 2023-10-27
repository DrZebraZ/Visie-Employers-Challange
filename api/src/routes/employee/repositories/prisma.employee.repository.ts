import { ResultValidation } from "@/utils/result-validation";
import { EmployeeRepository } from "../employee.repository.model";
import { createEmployeeBodyType, idPessoaType } from "../employee.schemas";
import { prisma } from "@/db/prisma";
import { ERROR_TYPES } from "@/errors/error.types";




export class PrismaEmployeeRepository implements EmployeeRepository{
  async create(data: createEmployeeBodyType, resultValidation: ResultValidation): Promise<void> {
    try{
      await prisma.pessoas.create({
        data: data
      }).then(result => 
        result != null ? resultValidation.setResult({data: "Created!"}) :
        resultValidation.addError(ERROR_TYPES.employee.CREATE_EMPLOYEE.TAG, ERROR_TYPES.employee.CREATE_EMPLOYEE.MESSAGE)  
      )
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.INSERT_ERROR.TAG, ERROR_TYPES.database.INSERT_ERROR.MESSAGE, true, err)
    }
  }

  async updateById(data: createEmployeeBodyType, id: number, resultValidation:ResultValidation): Promise<void>{
    try{
      await prisma.pessoas.update({
        where:{
          id_pessoa: id
        },
        data: data
      }).then((result)=>{
        if(result != null){
          resultValidation.setResult({data: result})
        }
      })
    }catch(err){
      console.log(`${err}`)
      resultValidation.addError(ERROR_TYPES.database.UPDATE_ERROR.TAG, ERROR_TYPES.database.UPDATE_ERROR.MESSAGE, true, err)
    }
  }

  async findByCPFOrRG(cpf: string,rg:string, resultValidation:ResultValidation): Promise<void>{
    try{
      await prisma.pessoas.findFirst({
        where:{
          OR:[
            {cpf:cpf},
            {rg:rg}
          ]
        }
      }).then((result) =>{
        if(result != null){
          resultValidation.setResult({data: result})
        }
      })
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.SELECT_ERROR.TAG, ERROR_TYPES.database.SELECT_ERROR.MESSAGE, true, err)
    }

  }

  async findById(id: number, resultValidation:ResultValidation): Promise<void>{
    try{
      await prisma.pessoas.findUnique({
        where:{
          id_pessoa: id
        }
      }).then((result) =>{
        if(result != null){
          resultValidation.setResult({data: result})
        }
      })
    }catch(err){
      console.log(err)
      resultValidation.addError(ERROR_TYPES.database.SELECT_ERROR.TAG, ERROR_TYPES.database.SELECT_ERROR.MESSAGE, true, `${err}`)
    }

  }

  async deleteById(id_pessoa: number, resultValidation:ResultValidation): Promise<void>{
    try{
      await prisma.pessoas.delete({
        where:{
          id_pessoa
        }
      }).then((result) =>{
        if(result != null){
          resultValidation.setResult({data: "Deletado!"})
        }
      })
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.DELETE_ERROR.TAG, ERROR_TYPES.database.DELETE_ERROR.MESSAGE, true, err)
    }
  }

  async findALL(resultValidation: ResultValidation): Promise<void> {
    try{
      await prisma.pessoas.findMany({
        select:{
          id_pessoa: true,
          nome: true,
          data_admissao: true
        }
      }).then((result)=>{
        if(result != null){
          resultValidation.setResult({data: result})
          return
        }
        resultValidation.setResult({data: "empty"})
      })
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.SELECT_ERROR.TAG, ERROR_TYPES.database.SELECT_ERROR.MESSAGE, true, err)
    }
  }
}