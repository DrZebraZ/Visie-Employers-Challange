import { Routes, Route } from 'react-router-dom'
import Home from '../views/home'
import React from 'react'
import { EmployeeView } from '../views/employeView'
import { EmployeeEdit } from '../views/employeEdit'
import { EmployeeAdd } from '../views/employeAdd'


export default function Router(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/employee/:id" element={<EmployeeView/>} />
      <Route path="/employee/edit/:id" element={<EmployeeEdit/>}/>
      <Route path="/employee/add" element={<EmployeeAdd/>}/>
    </Routes>
  )
}
