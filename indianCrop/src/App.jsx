import { useState } from 'react'
import logo from '/logo.jpg'
import './App.css'
import axios from "axios";
import React from "react";
import TableauReponse from './component/TableauReponse';
import Chartjs from './component/ChartJs';
import {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const baseURL = "http://localhost:8080";
import Chart from "chart.js/auto";
import { CategoryScale, elements } from "chart.js";

Chart.register(CategoryScale);

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState("")

  const [post, setPost] = useState("")
  const [pagination, setPagination] = useState(0)
  const [orderBy, setOrderBy] = useState(0)
  const [orderTrend, setOrderTrend] = useState(0)
  const [yieldData, setYieldData] = useState("")

  const fetchUserData = (e) => {
    e.preventDefault()
    axios.get(`${baseURL}/database/${post}/pagination/${pagination}`).then((response) => {
      setData(response.data);
    });

    axios.get(`${baseURL}/database/${post}`).then((response) => {
     const dataTest = response.data
  
     /* const SortedData = {};
      response.data.forEach(element => {
        
        SortedData[element._source.Year] ?  SortedData[element._source.Year] += element._source.Yield :  SortedData[element._source.Year] = element._source.Yield
      });
      console.log(SortedData)

      SortedData.map((data) => console.log(data))

      SortedData.map((element) => {
        console.log(elements)
      })
      */
      const SortedData = [];
      response.data.forEach(element => {
        SortedData[element._source.Year] ?  SortedData[element._source.Year] += element._source.Yield :  SortedData[element._source.Year] = element._source.Yield
      });
      console.log(SortedData)
      SortedData.map((data, key) => console.log('2data : ' + data , '2key : ' + key))

      

      const test  = {
        labels: response.data.map((data) => data._source.Year), 
        datasets: [
          {
            label: "Tet",
            data: response.data.map((data) => data._source.Yield),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "withe",
            borderWidth: 2
          }
        ]
      }
      console.log(test)
      setYieldData(test);
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
      {yieldData ? <Chartjs yieldData={yieldData}/> : ""}
    </>
  )
}

export default App



