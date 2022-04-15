import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
export default function Search() {
  const [filter, setFilter] = useState("")
  const handleSearchChange = (e) =>{
    setFilter(e.target.value);
  }
  return (
    <div> 
      <TextField  className = 'search-box' style = {{outline :"None",background:'white' , color:'white'}} id="standard-basic" label="Search Customer ID" variant="outlined" />
    </div>
  );
}
