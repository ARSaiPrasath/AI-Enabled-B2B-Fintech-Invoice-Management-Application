import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddUser from './AddUser';
import { useState } from 'react';
import { addUser } from '../services/data';

export default function RightAddButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState({business_code:'',business_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''});

  const {business_code, business_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,invoice_currency,clear_date, document_create_date, posting_id} = user;

  const changeHandler = (e) => {
      const {name, value} = e.target;
      setUser({...user,[name] :value});
  }

  const submitHandler = async (e) =>{
      e.preventDefault();
      let response = await addUser(user); 
      if (response) {
          setUser({business_code:'',business_year:'', baseline_create_date:'', area_business:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'', invoice_currency:'',clear_date:'', document_create_date:'', posting_id:''});
          
        }
        document.location.reload(true)
  }
return ( <div>
<Button style = {{width : 120, height : 50,borderColor: "white",color : "white"}} variant="outlined" onClick={handleClickOpen}>Add</Button>
      <Dialog open={open} onClose={handleClose}>
        <div className='add'>
        <DialogTitle >Add User</DialogTitle>
        <DialogContent>
        <AddUser
        business_code = {business_code} business_year = {business_year}
        baseline_create_date = {baseline_create_date}
        area_business = {area_business}
        invoice_id = {invoice_id} 
        cust_number = {cust_number} 
        doc_id = {doc_id} 
        due_in_date = {due_in_date} 
        total_open_amount = {total_open_amount} 
        posting_date  = {posting_date} 
        document_type ={document_type} 
        cust_payement_terms= {cust_payment_terms}
        invoice_currency = {invoice_currency}
        clear_date = {clear_date}
        document_create_date = {document_create_date}
        posting_id = {posting_id}
        changeHandler = {changeHandler}
        submitHandler = {submitHandler} 
        closeHandler = {handleClose}/>
        </DialogContent>
        </div>
      </Dialog>
      </div>
);
}