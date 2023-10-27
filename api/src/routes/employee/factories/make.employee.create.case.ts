import { PrismaEmployeeRepository } from "../repositories/prisma.employee.repository";
import { EmployeeCreateCase } from "../use-cases/employee.create.case";


export async function makeEmployeeCreateCase(){
  const employeeRepository = new PrismaEmployeeRepository()
  const employeeCreateCase = new EmployeeCreateCase(employeeRepository)
  return employeeCreateCase
}