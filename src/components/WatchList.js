import { useState, useEffect } from 'react';
import firebase from '../firebase';
import Movie from './Movie';

function WatchList(props) {
    const { movies } = props;

    //function to delete the movie
    function handleRemove(id){
        const dbRef = firebase.database().ref();
        dbRef.child(id).remove();
    }

    //function to delete the movie
    function handleWatched(id){
        const ref = firebase.database().ref(id);
        ref.update({ rated: true, watchlist: false})
    }

    return (
        <section className="wrapper" id="watchlist">
            <h2>WatchList</h2>
            <ul className="watchlist">
            {
                movies.map(movie => {
                    return(
                        <li key={movie.id}>

                            < Movie 
                                movie={movie.movie}
                                rating={movie.movie.vote_average}
                                />

                            <button
                                id={movie.id}
                                onClick={() => {handleRemove(movie.id)}}
                                >
                                    Remove
                            </button>

                            <button
                                id={movie.id}
                                onClick={() => {handleWatched(movie.id)}}
                                >
                                    Watched
                            </button>

                        </li>

                    )
                })
            }
            </ul>
        </section>
    );
}

export default WatchList;


