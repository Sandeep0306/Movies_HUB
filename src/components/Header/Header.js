import React from 'react';

const Header = () => {
  return (
    <>
    <span onClick={() => window.scroll(0,0)} className=' header lg:text-5xl max-sm:text-3xl sm:text-4xl max-sm:p-4 w-full flex justify-center uppercase
     text-white bg-yellow-500 fixed font-mono lg:p-4 z-100 cursor-pointer shadow-2xl '>
       🎬  Movies Hub 🎬 
    </span>
    </>
  )
}

export default Header;
