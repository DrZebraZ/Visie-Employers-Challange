import { ResultValidation } from "@/utils/result-validation";
import { EmployeeRepository } from "../employee.repository.model";
import { createEmployeeBody, createEmployeeBodyType } from '../employee.schemas';
import { ERROR_TYPES } from "@/errors/error.types";


export class EmployeeUpdateCase{
  constructor(private repository: EmployeeRepository){}
  async execute(data: createEmployeeBodyType, params: {id_pessoa: string}, resultValidation:ResultValidation):Promise<void>{
    const id = Number(params.id_pessoa)
    console.log(data)
    await this.repository.findById(id, resultValidation)
    if(resultValidation.hasError()){
      return
    }
    if(resultValidation.isResultEmpty()){
      resultValidation.addError(ERROR_TYPES.employee.NOT_FOUND.TAG, ERROR_TYPES.employee.NOT_FOUND.MESSAGE)
      return
    }
    const employee = createEmployeeBody.safeParse({
      ...data
    })
    if(!employee.success){
      throw new Error("Erro interno")
    }

    await this.repository.updateById(employee.data, id, resultValidation)
  }
}