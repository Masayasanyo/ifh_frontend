import React, { useState, useEffect } from 'react';
import styles from './trailer.module.css'
import { useNavigate } from 'react-router-dom';

function Trailer() {

    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films`, {
                    method: "GET",
                });

                const data = await response.json();
                setFilms(data.data);
                console.log(`${process.env.REACT_APP_STORAGE_URL}${data.data[4].thumbnail_file_path}`);

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
                {films.length > 0 ? (
                    films.map((film, index) => (
                        <li key={film.id} onClick={() => openFilm(film.id)} className={styles.trailer}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${film.thumbnail_file_path}`} alt={film.title} />
                            <p>{film.title}</p>
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