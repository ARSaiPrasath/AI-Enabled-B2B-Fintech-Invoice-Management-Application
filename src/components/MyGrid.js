import {TableContainer, TableHead, Paper, Table, TableRow, TableCell, TableBody } from "@mui/material";
import React from 'react';
import { useEffect, useState } from 'react';
import {AddUser, getData} from '../services/data';
import { Checkbox } from "@material-ui/core";
import Search from "./Search";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RightAddButton from './RightAddUser';
import EditUser from './EditUser';
import Sortarrow from "./Sortarrow";
import { updateUser } from "../services/data";
import { deleteUser } from "../services/data";
import {TablePagination} from '@material-ui/core';
import { AdvSearch } from "../services/data";
import AdvanceSearch from "./AdvanceSearch";
import RefreshIcon from '@mui/icons-material/Refresh';
import Pagination from "./Pagination";
import { predict } from "../services/data";
import '../styles.css';

function MyGrid() {
    const [data,setData] = useState([]);
    const [columns,setColumns] = useState(["sl_no","business_code","cust_number","clear_date","buisness_year","doc_id","posting_date","document_create_date","document_create_date1","due_in_date","invoice_currency","document_type","posting_id","area_business","total_open_amount","baseline_create_date","cust_payment_terms","invoice_id","name_customer","business_name"])
    const [pageSize, setPageSize] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''});
    const [edit, setEdit] = useState({sl_no:'', invoice_currency:'',cust_payment_terms:'', name_customer:''});
    var {business_code, buisness_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,invoice_currency,clear_date, document_create_date, posting_id} = user;
    var {sl_no,invoice_currency, cust_payment_terms } = edit;
    const [adv, setadv] = useState({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''})
    var {invoice_id, doc_id, buisness_year,cust_number} = adv
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [count, setCount] = React.useState(0);
    const [orderBy, setOrderBy] = React.useState('sl_no');
    const [order, setOrder] = React.useState('ASC');
    const[search, setSearch] = useState(false);

    const searchHandler = () => {
      setSearch(true);
    }
    
    const advSearchHandler = (e) => {
      const {name, value} = e.target;
      setadv({...adv,[name] :value});
  }

    const handleSearch = async (update) => {
    if(update){
      let response = await AdvSearch(adv);     
      console.log(response);
      window.confirm('found match at ' + response[10])
      setadv({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''})
    }
    setSearch(false);
}

    const changeHandler = (e) => {
      const {name, value} = e.target;
      setEdit({...edit,[name] :value});
  }
    const handleClickOpen = () => {
      setOpen(true);
    };
  const editHandler = () => {
    setOpen(true);
    
  }
  const deleteHandler = async (e) => {
    let response =  await deleteUser(sl_no);
    document.location.reload(true)
  }

  const checkHandler = (e, sl_no) =>{
    if (e.target.checked){ 
    let edit = data.filter(user => user.sl_no == sl_no)[0];
    setEdit(edit)
    }
  }

  const handleClose = async (update) => {
    if (update){
      let response = await updateUser(edit);
      document.location.reload(true)
    }
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortingHandler = (newField) =>{
    if (orderBy == newField){
      let newOrder = order == "ASC" ? "DESC" : "ASC";
      setOrder(newOrder)
    }
    else{
      setOrder("ASC");
    }
    setOrderBy(newField);
  } 
  useEffect(async function () {
    let data = await getData(page, rowsPerPage, order, orderBy);
    setData(data['data']);
    setCount(data['count']);
  }, [rowsPerPage, page, order, orderBy]);
  
  const handlePredict = () => {
    let data = {
      name_customer:edit.name_customer,
      business_code: edit.business_code,
      cust_number: edit.cust_number,
      clear_date: edit.clear_date,
      buisness_year: edit.buisness_year,
      doc_id: edit.doc_id,
      posting_date: edit.posting_date,
      due_in_date: edit.due_in_date,
      baseline_create_date: edit.baseline_create_date,
      cust_payment_terms: edit.cust_payment_terms,
      converted_usd: edit.invoice_currency==="CAD"?edit.total_open_amount*0.79:edit.total_open_amount}
      let bucket = predict(data)
  }
  return <>
    <div classname = "grid">
    <div className='box-container grid'>
      <div className = "left">
      <Stack direction="row">
      <Button style = {{height : 50, width:100, background: "#16aef2",borderColor: "#16aef2"}} onClick = {handlePredict} variant="contained">Predict</Button>
      <Button style = {{height : 50,borderColor:"#16aef2",color:'white', width:150}} variant="outlined">Analytics View</Button>
      <AdvanceSearch invoice_id = {  invoice_id }  cust_number = {cust_number} doc_id = { doc_id } buisness_year = {buisness_year} handleSearch={handleSearch} open = {search} changeHandleSearch = {advSearchHandler} />
      <Button style = {{height : 50, borderColor:"#16aef2" , color:'white', width:150}} variant="outlined" onClick = {searchHandler}>Advance Search</Button>
      <Button style = {{height:50, width:50}}onClick = {() => document.location.reload(true)}><RefreshIcon /></Button>
    </Stack>
      </div>
      <div className = "center"><Search /></div>
      <div className = "right">
      <Stack direction="row">
      <RightAddButton />
  
      <EditUser invoice_currency = { invoice_currency }  cust_payment_terms = { cust_payment_terms } sl_no = { sl_no } handleClose={ handleClose } open = { open } changeHandler = { changeHandler }/>
      <Button className = 'border' sx = {{width : 120, height : 50,borderColor:"white",color : "white"}} variant="outlined" onClick={editHandler} >Edit</Button>

      <Button style = {{width : 120, height : 50,borderColor:"white" ,color : "white"}} variant="outlined" onClick={deleteHandler}>Delete</Button>
    </Stack>
        </div>
    </div>      
    </div>
    <div class = "grid">
    <TableContainer component={Paper} style = {{backgroundColor:"#092338", outlineStyle:"solid"}} className = "grid">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
          <TableCell style = {{color:"white"}} align=""><Sortarrow order = {order} /></TableCell>
              <TableCell onClick = {() => sortingHandler("sl_no")} style ={{color:"white"}} align="">ID</TableCell>
              <TableCell onClick = {() => sortingHandler("business_code")} style ={{color:"white"}} align="">Business Code</TableCell>
              <TableCell onClick = {() => sortingHandler("name_customer")} style ={{color:"white"}} align="">Customer Name</TableCell>
              <TableCell onClick = {() => sortingHandler("cust_number")} style ={{color:"white"}} align="">Customer Number</TableCell>
              <TableCell onClick = {() => sortingHandler("clear_date")} style ={{color:"white"}} align="">Clear Date</TableCell>
              <TableCell onClick = {() => sortingHandler("buisness_year")} style ={{color:"white"}} align="">Business Year</TableCell>
              <TableCell onClick = {() => sortingHandler("doc_id")} style ={{color:"white"}} align="">Document ID</TableCell>
              <TableCell onClick = {() => sortingHandler("posting_date")} style ={{color:"white"}} align="">Posting Date</TableCell>
              <TableCell onClick = {() => sortingHandler("document_create_date")} style ={{color:"white"}} align="">Document Create Date</TableCell>
              <TableCell onClick = {() => sortingHandler("due_in_date")} style ={{color:"white"}} align="">Due Date</TableCell>
              <TableCell onClick = {() => sortingHandler("invoice_currency")} style ={{color:"white"}} align="">Invoice Currency</TableCell>
              <TableCell onClick = {() => sortingHandler("document_type")} style ={{color:"white"}} align="">Document Type</TableCell>
              <TableCell onClick = {() => sortingHandler("posting_id")} style ={{color:"white"}} align="">Posting ID</TableCell>
              <TableCell onClick = {() => sortingHandler("total_open_amount")} style ={{color:"white"}} align="">Total Open Amount</TableCell>
              <TableCell onClick = {() => sortingHandler("baseline_create_date")} style ={{color:"white"}} align="">Baseline Create Date</TableCell>
              <TableCell onClick = {() => sortingHandler("cust_payment_terms")} style ={{color:"white"}} align="">Customer Payment Terms</TableCell>
              <TableCell onClick = {() => sortingHandler("invoice_id")} style ={{color:"white"}} align="">Invoice ID</TableCell>
              <TableCell onClick = {() => sortingHandler("aging_bucket")} style ={{color:"white"}}align="">Aging Bucket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map(user => (
            <TableRow
              key={user.sl_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
          <TableCell component="th" scope="user">
            <Checkbox color="default" onClick={(e) => checkHandler(e,user.sl_no)} style = {{color:'white'}}/>
          </TableCell>
              <TableCell style ={{color:"white"}} component="th" scope="user">{user.sl_no}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.business_code}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.name_customer}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.cust_number}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.clear_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.buisness_year}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.doc_id}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.posting_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.document_create_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.due_in_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.invoice_currency}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.document_type}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.posting_id}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.total_open_amount}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.baseline_create_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.cust_payment_terms}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.invoice_id}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.aging_bucket}</TableCell>
         </TableRow>  
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination
      style = {{marginLeft : "50%", textAlign:"right"}}
      count={count} 
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      pageSize={pageSize}
      onPageSizeChange={(newPage) => setPageSize(newPage)}
  />
  </div>
  </>
}
export default MyGrid;