import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components.module.css';

function TrendingFilms() {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const openMovie = (id) => {
        const movie = movies.filter(movie => movie.id === id);
        navigate("/movie", { state: { movie } });
    };

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch("http://localhost:3001/films/trending", {
                    method: "GET",
                });
    
                const data = await response.json();
                setMovies(data.data);
    
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };
        fetchFilms();
    }, []);

    return (
        <div>
            <h2>🔥 Trending Movies</h2>
            <ul className={styles.filmContainer}>
                {movies.length > 0 ? (
                    movies.map((video, index) => (
                        <li key={video.id} onClick={() => openMovie(video.id)} className={styles.film}>
                            <img src={`http://localhost:3001${video.thumbnail_path}`} alt={video.title} />
                            <p>{video.title}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading films...</p>
                )}
            </ul>
        </div>
    )
}

export default TrendingFilms;