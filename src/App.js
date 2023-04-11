import "./App.css";
import { BrowserRouter,Route ,Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Trending from './Pages/Trending/Trending';
import SimpleBottomNavigation from './components/MainNav';
import { Container} from '@mui/material';
import Search from "./Pages/Search/Search";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <div className='min-h-screen bg-slate-800 '>
    <Container>
        <Routes>
        <Route path='/' Component={Trending} exact/>
        <Route path='/movies' Component={Movies} />
        <Route path='/series' Component={Series} />
        <Route path='/search' Component={Search} />
        </Routes>    
    </Container> 
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  )
}

export default App
