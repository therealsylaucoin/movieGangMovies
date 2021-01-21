import firebase from '../firebase';
import { useState, useEffect } from 'react';
import WatchList from './WatchList';
import Rated from './Rated';

function MovieList(props) {
    // const [watchlistMovies, setWatchlistMovies] = useState([]);
    // const [ratedMovies, setRatedMovies] = useState([]);
    const { watchlistMovies, setWatchlistMovies, ratedMovies, setRatedMovies } = props;

    function getMovies(databaseref, state){
        // Here we create a variable that holds a reference to our database
        const dbRef = firebase.database().ref();
        dbRef.on('value', (response) => {
        //GETTING AN OBJECT - Obtain an array with the information we need: The values!
        //using Object.values to get only the values :)     
        const dbResult = response.val();
        let movieArray = [];
        let filteredArray = [];

        for (let propertyKey in dbResult){
            //extracting the key and the values 
            const propertyVal = dbResult[propertyKey];
            const formattedObj = {
                id: propertyKey,
                movie: propertyVal
            };
            //push into the empty array created earlier
            movieArray.push(formattedObj);
        }
        //filter for the truthy values (rated and watchlist)
        movieArray.forEach(movie => {
            if (movie.movie[databaseref] === true){
                filteredArray.push(movie);
            }
        })
        //set the state of the array
        state(filteredArray);
        });
    }

    useEffect(() => {
        getMovies('watchlist', setWatchlistMovies);
    }, []);

    useEffect(() => {
        getMovies('rated', setRatedMovies);
    }, []);

    return (

        <>
            < WatchList 
                movies={watchlistMovies}
                />
            < Rated 
                movies={ratedMovies}
                />
        </>
    );
}

export default MovieList;