import React from "react";
import { useEffect ,useState} from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from "react-router-dom";


export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
   const navigate = useNavigate();

    useEffect(() =>{
        if(value===0){
            navigate("/");
        }else if(value===1){
            navigate("/movies")
        }else if (value === 2) {
            navigate("/series");
          } else if (value === 3) {
            navigate("/search");
          }

    },[value,navigate]);

    return (
        <BottomNavigation
          showLabels
          value={value}
          style={{width: "100%",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#eab308",
          zIndex: 100,}}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Trending" style={{color:"white"}} icon={<WhatshotIcon />} />
          <BottomNavigationAction label="Movies" style={{color:"white"}} icon={<MovieIcon />} />
          <BottomNavigationAction label="Tv-Series" style={{color:"white"}} icon={<TvIcon/>} />
          <BottomNavigationAction label="Search" style={{color:"white"}} icon={<SearchIcon />} />

        </BottomNavigation>
    );
  }