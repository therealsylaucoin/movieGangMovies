import '../styles/App.scss';
import { useState, useEffect } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import BoxOffice from './BoxOffice';


function App() {

  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);

  return (
    <div className="App">
      
      < Header />
    
      <main>

        < BoxOffice 
            watchlistMovies={watchlistMovies}
            ratedMovies={ratedMovies}
          />

        < MovieList 
            ratedMovies={ratedMovies}
            setRatedMovies={setRatedMovies}
            watchlistMovies={watchlistMovies}
            setWatchlistMovies={setWatchlistMovies}
          />

      </main>

    </div>
  );
}

export default App;
