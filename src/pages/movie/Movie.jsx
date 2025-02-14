import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'
import styles from './movie.module.css';
import FilmCrew from './film_crew/FilmCrew';

function Movie() {

    const location = useLocation();
    const { movie } = location.state || {};
    console.log(movie);
    const dateStr = movie[0].created_at;
    const year = dateStr.split("-")[0];
    const [crew, setCrew] = useState([]);
    
    useEffect(() => {
        const getCrew = async () => {
            try {
                const response = await fetch("http://localhost:3001/members", {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: movie[0].id}), 
                });

                const data = await response.json();
                setCrew(data.data)
                console.log(data.data);
            } catch (error) {
                console.error("Filed to fetch movies: ", error);
            }
        };
        getCrew();
    }, []);

    return (
        <div className={styles.container}>
            <h1>{movie[0].title}</h1>
            <h2>({year}) {movie[0].genre}</h2>
            <ReactPlayer url={`http://localhost:3001${movie[0].trailer_path}`} controls/>
            <h2>{movie[0].description}</h2>
            <hr />
            <FilmCrew crew={crew} />   
        </div>
    )
}

export default Movie;