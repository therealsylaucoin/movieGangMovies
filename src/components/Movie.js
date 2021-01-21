import { useState, useEffect } from 'react';

function Movie(props) {
    const { movie, rating } = props;
    const [ posterPath, setPosterPath ] = useState('');
    const [ showDetails, setShowDetails ] = useState(false);

    function handleClick(e){
        const button = e.target;
        setShowDetails(!showDetails);
        button.innerHTML = showDetails ? 'Show details' : 'Hide details' ;
    }

    useEffect(() => {
        setPosterPath(`http://image.tmdb.org/t/p/w500/${movie.poster_path}`);
    }, [])

    return (
            <li className="movie" key={movie.id}>
                <img src={posterPath} alt=""/>
                <div className="movie__info">
                    <div className={`${showDetails ? "showDetails" : ""}`}>
                        <button 
                            class="showDetailsButton"
                            onClick={handleClick}>Show details
                        </button>
                    </div>
                    { showDetails 
                        ?
                            <div className="showDetails">
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                                <p>Rated: {rating}</p>
                            </div>
                        : null
                    }
                </div>
            </li>
    );
}

export default Movie;

