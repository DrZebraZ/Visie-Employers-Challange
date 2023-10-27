import { FastifyInstance } from "fastify";
import { employeeSchemas } from "./routes/employee/employee.schemas";

export default async function setSchemas(app: FastifyInstance){
  try{
    for (let schema of [
      ...employeeSchemas
    ]){
      app.addSchema(schema)
    }
  }catch(err){
    console.log(err)
  }
}