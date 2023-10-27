import { ResultValidation } from "@/utils/result-validation";
import { EmployeeRepository } from "../employee.repository.model";
import { ERROR_TYPES } from "@/errors/error.types";
import { format } from "date-fns-tz";
import { employeeFullBodyType } from "../employee.schemas";


export class EmployeeGetCase{
  constructor(private repository: EmployeeRepository){}
  async getALL(resultValidation:ResultValidation):Promise<void>{
    await this.repository.findALL(resultValidation)
    if(resultValidation.isResultEmpty()){
      return resultValidation.addError(ERROR_TYPES.employee.NOT_FOUND.TAG, ERROR_TYPES.employee.NOT_FOUND.MESSAGE)
    }
    const employees: {id_pessoa: number, nome: string, data_admissao:string}[] = []
    for(let x in resultValidation.getResult().data){
      let employee = resultValidation.getResult().data[x]
      employees.push({
          id_pessoa: employee.id_pessoa,
          nome: employee.nome.split(' ')[0],
          data_admissao: format(new Date(employee.data_admissao), 'dd/MM/yyyy')
        }
      )
    }
    resultValidation.setResult({data:employees})
  }

  async getUnique(params: {id_pessoa: string}, resultValidation:ResultValidation):Promise<void>{
    const id = Number(params.id_pessoa)
    console.log("GetUNIQUE-ID: ",id)
    await this.repository.findById(id, resultValidation)
    if(resultValidation.isResultEmpty()){
      return resultValidation.addError(ERROR_TYPES.employee.NOT_FOUND.TAG, ERROR_TYPES.employee.NOT_FOUND.MESSAGE)
    }
    const employee: employeeFullBodyType = resultValidation.getResult().data
    
    const employeeFormated = {
      id_pessoa: employee.id_pessoa,
      nome: employee.nome,
      cpf: employee.cpf,
      rg: employee.rg,
      funcao: employee.funcao,
      data_nascimento: await this.formatDate(employee.data_nascimento),
      data_admissao: await this.formatDate(employee.data_admissao)
    }
    resultValidation.setResult({data: employeeFormated})
  }

  async formatDate(data: Date){
    console.log(String(data))
    const dataFormatada = format(data, "dd/MM/yyyy", {timeZone: "UTC-3"});
    console.log(dataFormatada)
    return dataFormatada
  }

}