import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import styles from './trailer.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

function Trailer() {

    const location = useLocation();
    // const { movie } = location.state || {};

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const openMovie = (id) => {
        const movie = movies.filter(movie => movie.id === id);
        console.log(movie);
        navigate("/movie", { state: { movie } });
    };

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await fetch("http://localhost:3001/films", {
                    method: "GET",
                });

                const data = await response.json();
                console.log(data.data);
                setMovies(data.data);

            } catch (error) {
                console.error("Filed to fetch trailers: ", error);
            }
        };
        fetchTrailers();
    }, []);

    return (
        <div>
            <h1>Trailer</h1>
            <hr />
            <ul className={styles.trailerContainer}>
                {movies.length > 0 ? (
                    movies.map((video, index) => (
                        <li key={video.id} onClick={() => openMovie(video.id)} className={styles.trailer}>
                            <p>{video.title}</p>
                            <img src={`http://localhost:3001${video.thumbnail_path}`} alt={video.title} />
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