import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { useState } from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";

export default function deleteUser({sl_no, handleClose, open}){
    return <>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Invoice</DialogTitle>
            <DialogActions>
              <Button onClick={() => handleClose(false)}>Cancel</Button>
              <Button onClick={() => handleClose(true)}>Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
        </>
    }


