import React, { useState, useEffect } from 'react';
import styles from './trailer.module.css'
import { useNavigate } from 'react-router-dom';

function Trailer() {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const openMovie = (id) => {
        navigate(`/movie/${id}`);
    };


    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await fetch("http://localhost:3001/films", {
                    method: "GET",
                });

                const data = await response.json();
                setMovies(data.data);

            } catch (error) {
                console.error("Filed to fetch trailers: ", error);
            }
        };
        fetchTrailers();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Trailer</h1>
            <ul className={styles.trailerContainer}>
                {movies.length > 0 ? (
                    movies.map((video, index) => (
                        <li key={video.id} onClick={() => openMovie(video.id)} className={styles.trailer}>
                            <img src={`http://localhost:3001${video.thumbnail_path}`} alt={video.title} />
                            <p>{video.title}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading trailers...</p>
                )}
            </ul>
        </div>
    )
}

export default Trailer;