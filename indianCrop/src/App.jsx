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
  const [type, setType] = useState("")


  const fetchUserData = (e) => {
    e.preventDefault()
    axios.get(`${baseURL}/database/data/${post}/type/${type}`).then((response) => {
      console.log(response.data)
      setData(response.data);
    });
  
  }
  const handleChangeType = (e) => {
    setType(e.target.value)
  }

  const handleChangeData = (e) => {
    console.log(e.target.value)
    setPost(e.target.value)
  }
  
  return (
    
    <>
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <h1>Indian Crop DataSet {type} / {post}</h1>
      
      <div className="card">
        <form onSubmit={fetchUserData}>
          <input onChange = {handleChangeData} value = {post} type="text" placeholder='Entrez votre recherche'/>
          <FormControl className='select-type' variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <Select
              id="demo-simple-select-filled"
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value={'ID'}>ID</MenuItem>
              <MenuItem value={'Crop'}>Crop</MenuItem>
              <MenuItem value={'District'}>District</MenuItem>
              <MenuItem value={'Season'}>Season</MenuItem>
              <MenuItem value={'State'}>State</MenuItem>
            </Select>
          </FormControl>
          <button type='submit'>valid</button>
        </form>
      </div>

      <TableauReponse data={data}/>
    </>
  )
}

export default App



