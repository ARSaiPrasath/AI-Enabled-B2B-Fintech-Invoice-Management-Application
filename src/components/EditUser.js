import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { useState } from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";

export default function EditUser({invoice_currency, cust_payment_terms, sl_no,changeHandler, handleClose, open}){
    return <>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <div className="edit">
            <DialogTitle>Edit Invoice</DialogTitle>
            <DialogContent>
            <TextField margin="dense" name="sl_no" id="sl_no " label="Serial No" value={sl_no} type = "text" fullWidth variant="standard" onChange = {changeHandler}/>
            <TextField autoFocus margin="dense" name ="invoice_currency" id="invoice_currency " label="Invoice Currency" type="text" value ={invoice_currency} fullWidth variant="standard" onChange = {changeHandler}/>
            <TextField autoFocus name ="cust_payment_terms" margin="dense" id="cust_payment_terms" label="Customer Payment Terms" type="text" value = {cust_payment_terms} fullWidth variant="standard" onChange = {changeHandler}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(false)}>Cancel</Button>
              <Button onClick={() => handleClose(true)}>Update</Button>
            </DialogActions>
            </div>
          </Dialog>
        </div>
        </>
    }


