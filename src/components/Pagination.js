import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({count, page, rowsPerPage,rowsPerPageOptions, handleChangePage, handleChangeRowsPerPage}) {
  return (
    <TablePagination 
    style = {{color:'white', textAlign: 'right', display:'flex'}}
    rowsPerPageOptions = {[5,10,20,50,100]}
    count={count}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}