import { ResultValidation } from "@/utils/result-validation";
import { EmployeeRepository } from "../employee.repository.model";
import { createEmployeeBody, createEmployeeBodyType } from '../employee.schemas';
import { ERROR_TYPES } from "@/errors/error.types";


export class EmployeeCreateCase{
  constructor(private repository: EmployeeRepository){}
  async execute(data: createEmployeeBodyType, resultValidation:ResultValidation):Promise<void>{
    const {cpf, rg} = data
    await this.repository.findByCPFOrRG(cpf, rg, resultValidation)
    if(resultValidation.hasError()){
      return
    }
    if(!resultValidation.isResultEmpty()){
      resultValidation.addError(ERROR_TYPES.employee.CPFRG_IN_USE.TAG, ERROR_TYPES.employee.CPFRG_IN_USE.MESSAGE)
      return
    }
    const employee = createEmployeeBody.safeParse({
      ...data
    })
    if(!employee.success){
      throw new Error("Erro interno")
    }

    await this.repository.create(employee.data, resultValidation)
  }
}