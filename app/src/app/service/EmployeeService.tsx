import ApiService from '../ApiService'

export interface UserBody{
  nome: string,
  rg: string,
  cpf: string,
  data_nascimento: Date,
  data_admissao: Date,
  funcao: string
}

export interface UserBodyId{
  nome: string,
  rg: string,
  cpf: string,
  data_nascimento: Date,
  data_admissao: Date,
  funcao: string,
  id: number
}

export interface EmployeeSimpleData{
  nome: string,
  data_admissao: string,
  id_pessoa: number
}

class EmployeeService extends ApiService {
  constructor() {
    super('/employee')
  }

  async add(credenciais: UserBody) {
    try{
      const result = await this.post('/create', credenciais)
      return result
    }catch(e){
      return new Error(e)
    }
    
  }

  async getAll() {
    try{
      return await this.get('/all')
    }catch(e){
      console.log(e)
    }
  }

  async getUnique(id:number) {
    try{
      return await this.get(`/${id}`)
    }catch(e){
      console.log(e)
    }
  }


  async edit(credenciais: UserBody, id:string){
    try{
      const response = await this.put(`/update/${id}`, credenciais)
      return response
    }catch(e){
      console.log(e)
    }
    
  }

  async deleta(id:number):Promise<any>{
    try{
      const response = await this.delete(`/delete/${id}`)
      return response
    }catch(e){
      console.log(e)
    }
  }

}
console.log('INSTANCIANDO PRODUTO SERVICE')
const employeeService = new EmployeeService()
export default employeeService


export async function onEditClickHandler(val:EmployeeSimpleData){
  window.location.href = `/employee/edit/${val.id_pessoa}`
}

export async function onSearchClickHandler(val:EmployeeSimpleData){
  window.location.href = `/employee/${val.id_pessoa}`
}

