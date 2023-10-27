import { ResultValidation } from "@/utils/result-validation";
import { EmployeeRepository } from "../employee.repository.model";
import { ERROR_TYPES } from "@/errors/error.types";


export class EmployeeDeleteCase{
  constructor(private repository: EmployeeRepository){}
  async execute(data: {id_pessoa: string}, resultValidation:ResultValidation):Promise<void>{
    const id = Number(data.id_pessoa)
    await this.repository.findById(id, resultValidation)
    if(resultValidation.hasError()){
      return
    }
    if(resultValidation.isResultEmpty()){
      resultValidation.addError(ERROR_TYPES.employee.NOT_FOUND.TAG, ERROR_TYPES.employee.NOT_FOUND.MESSAGE)
      return
    }
    await this.repository.deleteById(id, resultValidation)
    console.log(resultValidation)
  }
}