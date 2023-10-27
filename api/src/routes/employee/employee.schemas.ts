import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod'

const id_pessoa = z.number()
const nome = z.string({required_error: "Must provide a name"}).min(3)
const rg = z.string({required_error: "Must provide a RG"}).min(9)
const cpf = z.string({required_error: "Must provide a CPF"}).min(11)
const data_nascimento = z.coerce.date({required_error: "Must provide a birthday"})
const data_admissao = z.coerce.date({required_error: "Must provide a admission date"})
const funcao = z.string({required_error: "Must provide a function"})


export const idPessoaBody = z.object({
  id_pessoa
})
export type idPessoaType = z.infer<typeof idPessoaBody>

export const employeeFullBody =z.object({
  id_pessoa,
  nome,
  rg,
  cpf,
  data_admissao,
  data_nascimento,
  funcao
})
export type employeeFullBodyType = z.infer<typeof employeeFullBody>

export const createEmployeeBody = z.object({
  nome,
  rg,
  cpf,
  data_admissao,
  data_nascimento,
  funcao
})
export type createEmployeeBodyType = z.infer<typeof createEmployeeBody>

const updateEmployeeBody = z.object({
  id_pessoa,
  nome,
  rg,
  cpf,
  data_admissao,
  data_nascimento,
  funcao
})

export type updateEmployeeBodyType = z.infer<typeof updateEmployeeBody>

const models = {
  createEmployeeBody
}

const options = {
  $id: "employeeSchemas"
}

export const {schemas: employeeSchemas, $ref} = buildJsonSchemas(models, options)