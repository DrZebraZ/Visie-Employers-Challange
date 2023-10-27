import { useEffect, useState } from "react"
import React from "react"
import Container from 'react-bootstrap/Container'
import { useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import IconButton from "../components/iconButton"
import { BsHouseDoor, BsPencilSquare, BsTrash } from "react-icons/bs"
import employeeService, { UserBodyId } from "../app/service/EmployeeService";
import IconButtonRedirect from "../components/iconButtonRedirect";

export const EmployeeView = () => {
  const { id } = useParams();

  const [employee, setEmployee]:any|UserBodyId = useState()
  const [isLoading, setLoading] = useState(true)
  
  async function searchEmployers(){
    const response = await employeeService.getUnique(Number(id))
    console.log(response)
    if(response.status === 200){
      setEmployee(response.data.data)
      setLoading(false)
    }else{
      window.location.href="../"
    }

  }

  async function onDeleteClickHandler(id: number){
    const deletar = window.confirm(`Deseja deletar o usuário de ID ${id}?`)
    if(deletar){
      const response = await employeeService.deleta(id)
      if(response){
        if(response.status===200){
          window.alert("Deletado!")
          window.location.href="../"
        }else{
          window.alert("Erro ao deletar")
        }
      }
    }
  }


  useEffect(()=>{
    if (isLoading){
      searchEmployers()
    }else{
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
          <h2 style={{margin:'0px', padding:'1px 0px'}}>
            <IconButtonRedirect
              icon={BsHouseDoor}
              redirect={"/"}
            />
            Employee Viewer: {employee.id_pessoa}
          </h2>
          <Form> 
            <div className="row mt-3">
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control type="text" placeholder={employee.nome} readOnly disabled/>
              </Form.Group>
              <Form.Group className="col-6 mb-3" controlId="formGroupNome">
                <Form.Label>CPF</Form.Label>
                <Form.Control type="text" placeholder={employee.cpf} readOnly disabled/>
              </Form.Group>
              <Form.Group className="col-6 mb-3" controlId="formGroupNome">
                <Form.Label>RG</Form.Label>
                <Form.Control type="text" placeholder={employee.rg} readOnly disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Data Nascimento</Form.Label>
                <Form.Control type="text" placeholder={employee.data_nascimento} readOnly disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Data Admissão</Form.Label>
                <Form.Control type="text" placeholder={employee.data_admissao} readOnly disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Função</Form.Label>
                <Form.Control type="text" placeholder={employee.funcao} readOnly disabled/>
              </Form.Group>
            </div>
          </Form> 
          <div className="row justify-content-end">
            <p className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
              <IconButtonRedirect
                icon={BsPencilSquare}
                redirect={`/employee/edit/${id}`}
              />
            </p>
            <p onClick={()=>onDeleteClickHandler(Number(id))} className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
              <IconButton
                icon={BsTrash}
              />
            </p>
          </div>
        </div> 
      </div>
    </Container>
    </>
  )
}
}