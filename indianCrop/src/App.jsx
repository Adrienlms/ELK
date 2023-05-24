import { useState } from 'react'
import logo from '/logo.jpg'
import './App.css'
import axios from "axios";
import React from "react";
import TableauReponse from './component/TableauReponse';
import {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const baseURL = "http://localhost:8080"

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState("")
  const [post, setPost] = useState("")
  const [pagination, setPagination] = useState(0)



  const fetchUserData = (e) => {
    e.preventDefault()
    axios.get(`${baseURL}/database/${post}/pagination/${pagination}`).then((response) => {
      setData(response.data);
    });
  
  }

  const handleChangeData = (e) => {
    setPost(e.target.value)
  }

  const handlePreviousPage = (e) => {
    
    if ((pagination - 50) < 0){
      setPagination(0)
    }else{
      setPagination(pagination - 50)
    }
    fetchUserData(e)
  }

  const handleNextPage = (e) => {
    setPagination(pagination + 50)
    fetchUserData(e)
  }
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <h1>Indian Crop DataSet</h1>
      
      <div className="card">
        <form onSubmit={fetchUserData}>
          <input onChange = {handleChangeData} value = {post} type="text" placeholder='Entrez votre recherche'/>
          <button type='submit'>valid</button>
        </form>
      </div>

      <TableauReponse data={data}/>

      {pagination > 0 ? <button onClick={handlePreviousPage} >Previous</button> : <button onClick={handlePreviousPage} disabled>Previous</button> }
      
      {data.length == 50 ? <button onClick={handleNextPage} >Next</button> : <button onClick={handleNextPage} disabled>Next</button> }
      
    </>
  )
}

export default App



