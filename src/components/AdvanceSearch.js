import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { useState } from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
export default function AdvanceSearch({invoice_id, doc_id, buisness_year,cust_number, handleSearch, open, changeHandleSearch}){
    return <>
        <div>
          <Dialog open={open} onClose={handleSearch}>
            <div className="search">
            <DialogTitle>Search Invoice</DialogTitle>
            <DialogContent>
            <TextField autoFocus margin="dense" name ="invoice_id" id="invoice_id " label="Invoice ID" type="text" value ={invoice_id} fullWidth variant="standard" onChange = {changeHandleSearch}/>
            <TextField autoFocus name ="cust_number" margin="dense" id="cust_number" label="Customer Number" type="text" value = {cust_number} fullWidth variant="standard" onChange = {changeHandleSearch}/>
            <TextField margin="dense" name="doc_id" id="doc_id " label="Document ID" value={doc_id} type = "text" fullWidth variant="standard" onChange = {changeHandleSearch}/> 
            <TextField autoFocus name ="buisness_year" margin="dense" id="buisness_year" label="Business Year" type="text" value = {buisness_year} fullWidth variant="standard" onChange = {changeHandleSearch}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>handleSearch(false)}>Cancel</Button>
              <Button onClick={() => handleSearch(true)}>Search</Button>
            </DialogActions>
            </div>
          </Dialog>
        </div>
        </>
}