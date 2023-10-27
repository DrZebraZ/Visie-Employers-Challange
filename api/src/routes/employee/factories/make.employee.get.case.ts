import { PrismaEmployeeRepository } from "../repositories/prisma.employee.repository";
import { EmployeeGetCase } from "../use-cases/employee.get.case";


export async function makeEmployeeGetCase(){
  const employeeRepository = new PrismaEmployeeRepository()
  const employeeCreateCase = new EmployeeGetCase(employeeRepository)
  return employeeCreateCase
}