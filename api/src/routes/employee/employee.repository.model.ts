import { ResultValidation } from "@/utils/result-validation";
import { createEmployeeBodyType, idPessoaType } from "./employee.schemas";



export interface EmployeeRepository{
  create(data: createEmployeeBodyType, resultValidation:ResultValidation):Promise<void>
  findByCPFOrRG(cpf: string,rg:string, resultValidation:ResultValidation): Promise<void>
  findById(id: number, resultValidation:ResultValidation): Promise<void>
  deleteById(id: number, resultValidation:ResultValidation): Promise<void>
  updateById(data: createEmployeeBodyType, id: number, resultValidation:ResultValidation): Promise<void>
  findALL(resultValidation:ResultValidation): Promise<void>
}