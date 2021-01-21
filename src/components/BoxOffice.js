import firebase from '../firebase';
import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';

function BoxOffice (props) {
    const { watchlistMovies, ratedMovies } = props;

    const [boxoffice, setBoxoffice] = useState([]);
    const [movieSearch, setMovieSearch] = useState('');
    const [movieSearchArray, setMovieSearchArray] = useState([]);
    
    //getmovies from API - set boxOffice
    useEffect(() => {
        axios({
            url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=445c26dd7bffbfc473e2fe97ecb6c2dc',
            method: 'GET',
        }).then((results) => {
            setBoxoffice((results.data.results).slice(0, 10));
            buttonDisable(watchlistMovies);
            buttonDisable(ratedMovies);
        })
        
    }, [])

    //search movies
    useEffect(() => {
        if (movieSearch !== ''){
            axios({
                url: `https://api.themoviedb.org/3/search/movie?api_key=445c26dd7bffbfc473e2fe97ecb6c2dc`,
                method: 'GET',
                params: {
                    query: movieSearch
                }
            }).then((results) => {
                setMovieSearchArray((results.data.results).slice(0, 10));
                buttonDisable(watchlistMovies);
                buttonDisable(ratedMovies);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [movieSearch])

    //setButton statuses when lists are updated
    useEffect(() => {
        buttonDisable(watchlistMovies);
    }, [watchlistMovies])

    useEffect(() => {
        buttonDisable(ratedMovies);
    }, [ratedMovies])

    //function to set the button statuses 
    function buttonDisable(array){
        const Ids = [];
        array.forEach(movie => {
            Ids.push(movie.movie.id);
        })
        const buttons = document.querySelectorAll(`.addButton`);
        buttons.forEach(button => {
            if(Ids.includes(parseInt(button.id))){
                button.disabled = true;
                button.innerHTML = 'Added';
                button.classList.add('disabled');
            }
        })
    }


    //function to grab input
    function handleChange(e){
        setMovieSearch(e.target.value);
    }

    //make dbref and make function to push into it
    function handleClick(movie){
        const obj = {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            overview: movie.overview,
            watchlist: true,
            rated: false,
            ratings: [0]
        }
        const dbref = firebase.database().ref();
        dbref.push(obj);
    }

    return (
    <section className="wrapper" id="boxOffice">
        <h2>Box Office</h2>

        <label className="srOnly" htmlFor='movieSearch'>Enter movie title:</label>
            <input 
                type='text' 
                id='movieSearch'
                placeholder="Search Movies"
                autoComplete="off"
                onChange={handleChange}
            >
            </input>

        <ul className="boxOffice">
            { movieSearch !== '' 
                ? 
                    movieSearchArray.map(movie => {
                        return(
                            <>
                                <li key={movie.id}>

                                    < Movie 
                                        movie={movie}
                                        rating={movie.vote_average}
                                        />

                                    <button
                                        className="addButton"
                                        id={movie.id}
                                        onClick={() => {handleClick(movie)}}
                                        >
                                        Add to Watchlist
                                    </button>
                                </li>
                                
                            </>
                        )
                    })

                :  boxoffice.map(movie => {
                        return(
                            <>
                                <li key={movie.id}>

                                < Movie 
                                    movie={movie}
                                    rating={movie.vote_average}
                                    />
                                    
                                    <button
                                        className="addButton"
                                        id={movie.id}
                                        onClick={() => {handleClick(movie)}}
                                        >
                                        Add to Watchlist
                                    </button>
                                </li>

                            </>
                        )
                    })
            }
        </ul>

    </section>
    )
}

export default BoxOffice;