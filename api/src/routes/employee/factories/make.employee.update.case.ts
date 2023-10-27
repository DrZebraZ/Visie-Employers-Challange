import { PrismaEmployeeRepository } from "../repositories/prisma.employee.repository";
import { EmployeeUpdateCase } from "../use-cases/employee.update.case";


export async function makeEmployeeUpdateCase(){
  const employeeRepository = new PrismaEmployeeRepository()
  const employeeCreateCase = new EmployeeUpdateCase(employeeRepository)
  return employeeCreateCase
}