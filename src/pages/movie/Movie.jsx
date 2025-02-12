import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'

function Movie() {

    const location = useLocation();
    const { movie } = location.state || {};
    console.log(movie);

    return (
        <div>
            <div>
                <h1>{movie[0].title}</h1>
                <h2>{movie[0].description}</h2>
            </div>
            <ReactPlayer url={`http://localhost:3001${movie[0].trailer_path}`} controls/>
        </div>
    )
}

export default Movie;