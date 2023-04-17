import React from 'react';
import { useState,useEffect } from 'react';
import { createTheme,Button,TextField, ThemeProvider,Tabs,Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SingleContent from "../../components/SingleContent/SingleContent";
import axios from 'axios';
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
const [type, setType]= useState(0);
const [content, setContent]= useState([]);
const [numOfPages, setNumOfPages]= useState();
const [searchText, setSearchText]= useState("");
const [page, setPage]= useState(1);

const darkTheme = createTheme({
  palette:{
type:"dark",
primary: {
  main:"#fff",
},
  },
});

const fetchSearch = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  window.scroll(0, 0);
  fetchSearch();
  // eslint-disable-next-line
}, [type, page]);

  return (
    <div >
      {/* <h1 className='text-2xl font-serif text-white p-28 text-center uppercase'>Search</h1> */}
   <ThemeProvider theme={darkTheme}>
        <div className=' flex pt-36 '>
          <TextField
           className="  bg-white flex-1 "
           label="Search"
           variant="filled"
           onChange={(e) => setSearchText(e.target.value)}
          />
          <Button  onClick={fetchSearch}
            variant="contained" className='ml-3'>
            <SearchIcon fontSize='large'/>
          </Button>
        </div>
        <Tabs
        value={type}
        indicatorColor='primary'
        textColor='#fff'
        onChange={(event, newvalue) =>{
          setType(newvalue);
          setPage(1);
        }}
        className='pb-2  text-white'
        aria-label='disabled tabs example'
        >
          <Tab className='w-1/2' label="Search Movies"/>
          <Tab className='w-1/2' label="Search TV Series"/>
        </Tabs>
      </ThemeProvider>
      <div className='flex flex-wrap justify-around text-white'>
        {content && content.map((c) =>(
          <SingleContent
          key = {c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={type ? "tv" :"movie"}
          vote_average={c.vote_average}          
          />
        ))}
        {searchText && !content && (type ? <h2>No Series Found</h2> :<h2>No Movies Found</h2>)}
      </div>
      {numOfPages>1 && ( 
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
    </div>
  )
}

export default Search
