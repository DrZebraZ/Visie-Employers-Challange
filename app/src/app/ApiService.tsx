import axios from 'axios'

const httpClient = axios.create({
  baseURL: "http://0.0.0.0:3001"
})

class ApiService {

  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async post(url: string, objeto: any) {
    try{
      const requestUrl = `${this.apiUrl}${url}`
      const response = await httpClient.post(requestUrl, objeto)
        console.log("REQUEST")
        console.log(response)
        return response
      }catch(err:any){ 
        console.log("REQUEST ERR")
        console.log(err)
        return err.response.data
    }
  }

  async put(url: string, objeto:any) {
    try{
      const requestUrl = `${this.apiUrl}${url}`
      const response = await httpClient.put(requestUrl, objeto)
      return response
    }catch(err:any){
      console.log(err)
      return err.response.data
    }
  }

  async delete(url:string):Promise<any>{
    try{
      const requestUrl = `${this.apiUrl}${url}`
      const response = await httpClient.delete(requestUrl)
      return response
    }catch(err:any){
      console.log(err)
      if (err.response.data[0]){
        return err.response.data[0]
      }
      return err.response.data
    }
  }
    

  async get(url:string){
    try{
      const requestUrl = `${this.apiUrl}${url}`
      const response = await httpClient.get(requestUrl)
      return response
    }catch(err:any){
      console.log(err)
      return err.response
    }
  }
}
export default ApiService
