import { useState, useEffect } from 'react';
import firebase from '../firebase';
import Movie from './Movie';

function Rated(props) {
    const {  movies } = props;

    //function to display rating history
    return (
        <section className="wrapper" id="rated">
            <h2>Watched</h2>
            <ul className="rated">
            {
                movies.map((movie) => {
                    return(
                        <li key={movie.id}>

                            < Movie 
                                movie={movie.movie}
                                rating={movie.movie.vote_average}
                                />

                            < RatingForm 
                                    movie={movie}
                                />

                        </li>
                    )
                })
            }
            </ul>

        </section>
    );
}

function RatingForm(props) {

    const { movie } = props;
    const [ rating, setRating ] = useState(null);
    const [ name, setName ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ formVisible, setFormVisible ] = useState(false);

    function handleClick(){
        setFormVisible(true);
    }

    useEffect(() => {
        const button = document.querySelectorAll('.rateButton');
        button.forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        })
    }, [])

    function handleChange(e){
        const target = e.target;
        let value = target.value;
        const name = target.name;

        if (name === "name"){
            setName(value)
        } else if (name === "rating"){
            setRating(value)
        } else if (name === "comment"){
            setComment(value)
        }
    }

    function rateMovie(movie){
        //grab the value and push it into the db
        //move the movie from watchlist = false to rated = true
        const dbRef = firebase.database().ref(`${movie.id}/ratings`);
        const obj = {
            name: name,
            rating: rating, 
            comment: comment,
        }
        dbRef.push(obj);
        const form = document.getElementById(JSON.stringify(movie.movie.id));
        form.reset();
        setFormVisible(false);
    }

    return(

        formVisible

        ?   <>
            <form action="" id={movie.movie.id}>

                <p>Your name:</p>

                    <input type="radio" value="shardul" id="shardul" name="name" required onChange={handleChange}/>
                    <label htmlFor="shardul">Shardul</label>
                    <input type="radio" value="kiel" id="kiel" name="name" onChange={handleChange}/>
                    <label htmlFor="kiel">Kiel</label>
                    <input type="radio" value="nada" id="nada" name="name" onChange=    {handleChange}/>
                    <label htmlFor="nada">Nada</label>
                    <input type="radio" value="jacinthe" id="jacinthe" name="name" onChange={handleChange}/>
                    <label htmlFor="jacinthe">Jacinthe</label>
                    <input type="radio" value="Syl" id="Syl" name="name" onChange={handleChange}/>
                    <label htmlFor="Syl">Syl</label>

                <p>Your rating:</p>

                    <input type="number"id="rating" name="rating" min="0" max="10" onChange=        {handleChange} required/>
                    <label className="srOnly" htmlFor="rating">Rating from 1 to 10</label>

                <p>Comments:</p>

                    <input type="textArea" id="comment" name="comment"required onChange=        {handleChange}/>
                    <label className="srOnly" htmlFor="comment">Comments</label>

                {
                    rating !== null && name !== ''
                    ?   <button
                            onClick={(e)=> {
                                e.preventDefault()
                            rateMovie(movie)}} 
                            type="submit"
                            className="rateButton">
                        Submit Rating
                        </button>

                    : null
                }
        
            </form>

            <button 
                className="invisible">
                Delete movie
            </button>
            </> 

        :   <button
                onClick={handleClick}>
                Rate this movie
            </button>

    )
}

export default Rated;