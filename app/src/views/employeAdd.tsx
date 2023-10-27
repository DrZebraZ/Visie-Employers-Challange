import { useState } from "react"
import React from "react"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import IconButton from "../components/iconButton"
import { BsCheckSquare, BsHouseDoor, BsTrash } from "react-icons/bs"
import employeeService, { UserBody, UserBodyId } from "../app/service/EmployeeService";
import IconButtonRedirect from "../components/iconButtonRedirect";
import { format, utcToZonedTime } from "date-fns-tz";
import { parse } from "date-fns";

export const EmployeeAdd = () => {
  const [employee, setEmployee]:any|UserBodyId = useState({
    nome:null,
    rg:null,
    data_nascimento:null,
    data_admissao:null,
    funcao:null,
    cpf:null
  })

  async function onDeleteClickHandler(){
    const cancelar = window.confirm("Deseja Cancelar?")
    if (cancelar){
      window.location.href="../"
    }
  }

  async function converteData(dateString: string){
    console.log(dateString)
    const fusoHorario = 'America/Sao_Paulo';
    const date = parse(dateString, 'dd/MM/yyyy', new Date())
    const dataLocal = utcToZonedTime(date, fusoHorario);
    const dataFormatada = format(
      dataLocal, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
    )
    console.log(dataFormatada)
    return new Date(dataFormatada)

  }

  async function onConfirmClickHandler(event: any){
    try{
      if (employee.rg === null || 
        employee.cpf === null || 
        employee.nome === null || 
        employee.data_nascimento === null || 
        employee.data_admissao === null || 
        employee.funcao === null)
      {
        window.alert("Não pode haver campos em branco!")  
      }
      else{
        const confirmaAtualizar = window.confirm("Confirmar?")
        if (confirmaAtualizar){
          const employeeAdd: UserBody ={
            cpf: employee.cpf,
            nome: employee.nome,
            data_nascimento: await converteData(employee.data_nascimento),
            data_admissao: await converteData(employee.data_admissao),
            funcao: employee.funcao,
            rg: employee.rg
          }
          console.log(employeeAdd)
          const response = await employeeService.add(employeeAdd)
          console.log(response)
          if(response.statusCode === 400 || response.status === 400){
            if(response.message){
              window.alert(response.message)
            }else{
              window.alert("Erro ao criar, Verifique os dados informados!")
            }
          }
          if(response.statusCode === 201 || response.status === 201){
            window.alert("Created!")
            window.location.href="../"
          }else if(response.detail){
            window.alert(`${response.detail[0].loc}, ${response.detail[0].msg}`)
          }
        }
      }
    }catch(err){
      window.alert(err)
    }
    
  }

  const handleNameChange = (event: any) => {
    const value = event.target.value;
    setEmployee({...employee, nome: value}) 
  }

  const handleCPFChange = (event: any) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    //const paddedValue = cleanedValue.padStart(11, '0');
    const formattedCPF = cleanedValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

    setEmployee({...employee, cpf: formattedCPF})
    
  }
  
  const handleRGChange = (event: any) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    let formattedRG1 = cleanedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
    let formattedRG2 = cleanedValue.replace(/^(\d{9})(\d{1})$/, '$1-$2');
    let finalRG = ""
    if(formattedRG1.length>formattedRG2.length){
      finalRG = formattedRG1
    }else{
      finalRG = formattedRG2
    }
    setEmployee({...employee, rg: finalRG}) 
  }

  const handleDataNascChange = (event: any) => {
    console.log(employee.data_nascimento)
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    const formattedDate = cleanedValue.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
    setEmployee({...employee, data_nascimento: formattedDate}) 
  }

  const handleDataAdmissaoChange = (event: any) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    const formattedDate = cleanedValue.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
    setEmployee({...employee, data_admissao: formattedDate}) 
  }
  const handleFuncaoChange = (event: any) => {
    const value = event.target.value;
    setEmployee({...employee, funcao: value}) 
  }

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
              Employee ADD
            </h2>
            
            <Form>
            <div className="row mt-3">
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control 
                  type="text" 
                  value={employee.nome}
                  onChange={handleNameChange}
                  placeholder={employee.nome}/>
              </Form.Group>
              <Form.Group className="col-6 mb-3" controlId="formGroupNome">
                <Form.Label>CPF</Form.Label>
                <Form.Control 
                  type="text" 
                  value={employee.cpf}
                  onChange={handleCPFChange}
                  placeholder={employee.cpf}/>
              </Form.Group>
              <Form.Group className="col-6 mb-3" controlId="formGroupNome">
                <Form.Label>RG</Form.Label>
                <Form.Control 
                  type="text" 
                  value={employee.rg}
                  onChange={handleRGChange}
                  placeholder={employee.rg}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Data Nascimento</Form.Label>
                <Form.Control 
                  type="text" 
                  value={employee.data_nascimento}
                  onChange={handleDataNascChange}
                  placeholder={employee.data_nascimento}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Data Admissão</Form.Label>
                <Form.Control 
                  type="text" 
                  value={employee.data_admissao}
                  onChange={handleDataAdmissaoChange}
                  placeholder={employee.data_admissao}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNome">
                <Form.Label>Função</Form.Label>
                <Form.Control 
                  type="text" 
                  value={employee.funcao?? ""}
                  onChange={handleFuncaoChange}
                  placeholder={employee.funcao}/>
              </Form.Group>
              </div>
            </Form> 
            <div className="row justify-content-end">
              <p onClick={onConfirmClickHandler} className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
                <IconButton
                  icon={BsCheckSquare}
                />
              </p>
              <p onClick={onDeleteClickHandler} className='col-md-1' style={{margin:'0px', padding:'1px 0px'}}>
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