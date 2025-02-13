import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'

function Live() {

    const location = useLocation();
    const { publishedMovie } = location.state || {};
    console.log(`http://localhost:3001${publishedMovie[0].movie_path}`);
    
    return (
        <div>
            <h1>Live</h1>
            <ReactPlayer url={`http://localhost:3001${publishedMovie[0].movie_path}`} controls/>
            <div>
                <h2>{publishedMovie[0].title}</h2>
                <h3>{publishedMovie[0].description}</h3>
            </div>
        </div>
    )
}

export default Live;