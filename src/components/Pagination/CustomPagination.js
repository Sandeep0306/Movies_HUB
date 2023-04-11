import React from 'react';
import Pagination from '@mui/material/Pagination';
import {createTheme,ThemeProvider} from '@mui/material';

const darkTheme = createTheme({
  palette:{
    type:"dark",
  },
});


export default function CustomPagination({setPage, numOfPages=10}) {

const handlePageChange =(page) =>{
  setPage(page);
  window.scroll(0,0);
};


  return (
    <div className='w-full flex justify-center  pb-20'>
      <ThemeProvider theme={darkTheme}>
        <Pagination 
        className='bg-white p-3 rounded-lg '
        onChange = {(e) =>handlePageChange(e.target.textContent)}
        count = {numOfPages}
        color ="primary"
        variant='outlined'
        hideNextButton
        hidePrevButton        
        />
      </ThemeProvider>
      
    </div>
  );
};


