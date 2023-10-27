import { PrismaEmployeeRepository } from "../repositories/prisma.employee.repository";
import { EmployeeDeleteCase } from "../use-cases/employee.delete.case";


export async function makeEmployeeDeleteCase(){
  const employeeRepository = new PrismaEmployeeRepository()
  const employeeCreateCase = new EmployeeDeleteCase(employeeRepository)
  return employeeCreateCase
}