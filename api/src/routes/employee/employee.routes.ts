import { FastifyInstance } from "fastify";
import { EmployeeController } from "./employee.controllers";
import { $ref } from "./employee.schemas";



export async function EmployeeRoutes(app: FastifyInstance){
  const employeeController = new EmployeeController()
  
  app.post('/create', {schema:{body:$ref('createEmployeeBody')}}, employeeController.create);
  app.delete('/delete/:id_pessoa', employeeController.delete);
  app.put('/update/:id_pessoa', {schema:{body:$ref('createEmployeeBody')}}, employeeController.update)
  app.get('/all', employeeController.getALL)
  app.get('/:id_pessoa', employeeController.getUnique)
}