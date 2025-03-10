import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components.module.css';

function LatestFilms() {

    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films/latest`, {
                    method: "GET",
                });
    
                const data = await response.json();
                
                setFilms(data.data);
    
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };
        fetchFilms();
    }, []);

    return (
        <div className={styles.section}>
            <h2>🆕 Latest Releases</h2>
            <ul className={styles.filmContainer}>
                {films.length > 0 ? (
                    films.map((video, index) => (
                        <li key={video.id} onClick={() => openFilm(video.id)} className={styles.film}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${video.thumbnail_file_path}`} alt={video.title} />
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

export default LatestFilms;