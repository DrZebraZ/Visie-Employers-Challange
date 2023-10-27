import { useEffect, useState } from "react"
import employeeService, { EmployeeSimpleData } from "../app/service/EmployeeService"
import React from "react"
import './home.css'
import Container from 'react-bootstrap/Container'
import { BsHouseDoor, BsPencilSquare, BsSearch, BsTrash } from "react-icons/bs"
import IconButton from "../components/iconButton"
import IconButtonRedirect from "../components/iconButtonRedirect"

export default function Home(){

  const [employers, setEmployers]:any|EmployeeSimpleData = useState()
  const [isLoading, setLoading] = useState(true)

  async function searchEmployers(){
    const response = await employeeService.getAll()
    
    if(response){
      setEmployers(response.data.data)
      setLoading(false)
    }
  }

  async function onDeleteClickHandler(id: number){
    const deletar = window.confirm(`Deseja deletar o usuário de ID ${id}?`)
    if(deletar){
      const response = await employeeService.deleta(id)
      if(response.status === 200){
        window.alert("Deletado")
        searchEmployers()
      }else{
        window.alert("Erro ao deletar")
      }
    }
  }

  async function onAddClickHandler(){
    window.location.href="/employee/add"
  }

  useEffect(()=>{
    if (isLoading){
      searchEmployers()
    }
  })

  if(isLoading){
    return(
      <>
        <div>
          Loading...
        </div>
      </>
    )
  }else{
  return(
    <>
    <Container style={{position:"absolute", width:"100%", left:10, right:10, top:"10%"}}>
      <div className="row justify-content-md-center">
        <div className="col justify-content-md-center">
          <p style={{margin:'0px', padding:'1px 0px'}}>
            <IconButtonRedirect
              icon={BsHouseDoor}
              redirect={"/"}
            />
            Employers
          </p>
          <div className="row justify-content-between" style={{backgroundColor:"black", padding:"0px 15px"}}>
            <p className="col-4" style={{padding:"0px", margin:"0px"}}>Nome</p>
            <p className="col-7" style={{padding:"0px", margin:"0px"}}>Data Admissao</p>
            <p className="col-1"></p>
          </div>
          <div id="table-wrapper" className='row' style={{fontSize:'16px'}}>
            <div id="table-scroll" style={{border:"2px solid black"}}>
              <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                {employers.map((val:EmployeeSimpleData)=>{
                  return(
                    <li key={val.id_pessoa} className='row justify-content-between'>
                      <p className='col-4' style={{margin:'0px', padding:'1px 0px'}}>{val.nome}</p>
                      <p className='col-4' style={{margin:'0px', padding:'1px 0px'}}>{val.data_admissao}</p>
                      <p className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
                        <IconButtonRedirect
                          icon={BsSearch}
                          redirect={`/employee/${val.id_pessoa}`}
                        />
                      </p>
                      <p className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
                        <IconButtonRedirect
                          icon={BsPencilSquare}
                          redirect={`/employee/edit/${val.id_pessoa}`}
                        />
                      </p>
                      <p onClick={()=> onDeleteClickHandler(val.id_pessoa)} className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
                        <IconButton
                          icon={BsTrash}      
                        />
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='d-flex flex-row-reverse' style={{margin:'0px', padding:'1px 0px', right:0}}>
            <div className="row-1 mt-2" onClick={onAddClickHandler} style={{border:"2px solid white", borderRadius:"2px", padding:"2px 2px 2px 6px"}}>
              Adicionar
              <IconButton
                  icon={BsPencilSquare}
                />
            </div>
          </div>
        </div> 
      </div>
      </Container>
    </>
  )
}
}