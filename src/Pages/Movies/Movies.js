import { useEffect,useState } from 'react';
import Genres from "../../components/Genres/Genres";
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import useGenre from "../../hooks/useGenre";
import axios from 'axios';


const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const[page, setPage] = useState(1);
  const[content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);


  const fetchMovies= async() =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);

    setContent(data.results);
    setNumOfPages(data.total_pages);

  }

  useEffect(() =>{
    window.scroll(0,0);
    fetchMovies();
// eslint-disable-next-line
  },[page,genreforURL]);

  return (
    <div>
    <h1 className='text-2xl font-serif text-white p-28 pb-5 max-sm:p-20 max-sm:text-lg text-center uppercase space-x-1 max-sm:pb-4'>Discover  Movies</h1>
    <Genres
    type="movie"
    className="text-black"
    selectedGenres={selectedGenres}
    setSelectedGenres={setSelectedGenres}
    genres={genres}
    setGenres={setGenres}
    setPage= {setPage}
    />
    <div className='flex flex-wrap justify-around text-white'>
      {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
    
  )
}

export default Movies
