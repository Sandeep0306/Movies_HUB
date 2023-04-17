import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../Carousel/Carousel';
import axios from 'axios';
import { img_500, unavailable,unavailableLandscape } from '../../config/config';
import { useEffect,useState } from 'react';
import "./ContentModal.css"


//  const useStyles = createTheme((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     width: "90%",
//     height: "80%",
//     backgroundColor: "#39445a",
//     border: "1px solid #282c34",
//     borderRadius: 10,
//     color: "white",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(1, 1, 3),
//   },
// }));

export default function TransitionsModal({children,media_type,id}) {
  const [open, setOpen] = useState(false);
  const [content, setContent]= useState();
  const [video, setvideo]= useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const classes = useStyles();

const fetchData= async() =>{
  const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  setContent(data);
}
const fetchVideo= async() =>{
  const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  setvideo(data.results[0]?.key);
}

useEffect(() =>{
  fetchData();
  fetchVideo();
  // eslint-disable-next-line
},[])


  return (
    <>
      <div className='media' color='inherit' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="flex items-center justify-center"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
           {content && (
            <div style={{ width: "90%",
            height: "80%",
            backgroundColor: "#1e293b",
            border: "1px solid #282c34",
            borderRadius: 10,
            color: "white"}}>
              <div className='ContentModal '>
              <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />

                <div className='ContentModal__about'>
                  <span className='ContentModal__title'>
                    {content.name || content.title}(
                      {(
                        content.first_air_date || content.release_date|| "-----"
                      ).substring(0,4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                   <Carousel id={id} media_type={media_type}/>
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>

                </div>
              </div>
            </div>
           )}
        </Fade>
      </Modal>
    </>
  );
}