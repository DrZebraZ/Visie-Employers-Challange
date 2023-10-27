import { FastifyInstance } from "fastify";
import { EmployeeRoutes } from "./routes/employee/employee.routes";


export default async function setRoutes(app: FastifyInstance){
  app.register(EmployeeRoutes, {prefix: "/employee"})
}