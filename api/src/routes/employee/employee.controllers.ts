import { FastifyReply, FastifyRequest } from "fastify";
import { makeEmployeeCreateCase } from "./factories/make.employee.create.case";
import { ResultValidation } from "@/utils/result-validation";
import { applyResult } from "../middlewares/applyResult";
import { createEmployeeBodyType, idPessoaType } from "./employee.schemas";
import { makeEmployeeDeleteCase } from "./factories/make.employee.delete.case";
import { makeEmployeeUpdateCase } from "./factories/make.employee.update.case";
import { makeEmployeeGetCase } from "./factories/make.employee.get.case";




export class EmployeeController{
  constructor(){}
  
  async create(req: FastifyRequest<{Body: createEmployeeBodyType}>, res: FastifyReply){
    const employeeCase = await makeEmployeeCreateCase()
    const resultValidation = new ResultValidation()
    await employeeCase.execute(req.body, resultValidation)
    applyResult(resultValidation, res, 201)
  }

  async delete(req: FastifyRequest<{Params: {id_pessoa: string}}>, res: FastifyReply){
    const employeeCase = await makeEmployeeDeleteCase()
    const resultValidation = new ResultValidation()
    await employeeCase.execute(req.params, resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async update(req: FastifyRequest<{Params: {id_pessoa: string}, Body: createEmployeeBodyType}>, res: FastifyReply){
    const employeeCase = await makeEmployeeUpdateCase()
    const resultValidation = new ResultValidation()
    await employeeCase.execute(req.body, req.params, resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async getALL(req: FastifyRequest, res: FastifyReply){
    const employeeCase = await makeEmployeeGetCase()
    const resultValidation = new ResultValidation()
    await employeeCase.getALL(resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async getUnique(req: FastifyRequest<{Params: {id_pessoa: string}}>, res: FastifyReply){
    const employeeCase = await makeEmployeeGetCase()
    const resultValidation = new ResultValidation()
    await employeeCase.getUnique(req.params, resultValidation)
    applyResult(resultValidation, res, 200)
  }

}