import React, { useState, useEffect } from 'react';
import styles from './theatre.module.css'
import { useNavigate } from 'react-router-dom';
import FilmCrew from './film_crew/FilmCrew';
import Schedule from './schedule/schedule/Schedule';

function Theatre() {

    const navigate = useNavigate();

    const [publishedFilm, setPublishedFilm] = useState([]);

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };
    const goToLive = (id) => {
        navigate(`/live/${id}`);
    };

    useEffect(() => {
        // getWeekDates();
        const fetchFilms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films/schedule`, {
                    method: "GET",
                });

                const data = await response.json();
                console.log(data.data);
                setPublishedFilm(data.data);
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };
        fetchFilms();
    }, []);

    return (
        <div className={styles.container}>
            <h1>What's on</h1>
            <div className={styles.whatson}>

                <div className={`${styles.liveNowContainer} ${styles.section}`} >
                    {publishedFilm.length > 0 ? (
                    <div className={styles.movie}>
                        <img onClick={() => openFilm(publishedFilm[0].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[0].thumbnail_file_path}`} alt={publishedFilm[0].title} />
                        <div className={styles.movieInfo}>
                            <h2>{publishedFilm[0].title}</h2>
                            <h3>{publishedFilm[0].genre}, {publishedFilm[0].duration}min</h3>
                            <p>{publishedFilm[0].description}</p>
                            <FilmCrew film={publishedFilm[0]} />
                        </div>
                    </div>
                    ) : (
                        <p>Loading movie...</p>
                    )}
                    <button className={styles.toLiveButton} onClick={() => goToLive(publishedFilm[0].film_id)} >Watch Now</button>
                </div>

                <div className={`${styles.liveNowContainer} ${styles.section}`} >
                    {publishedFilm.length > 0 ? (
                    <div className={styles.movie}>
                        <img onClick={() => openFilm(publishedFilm[1].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[1].thumbnail_file_path}`} alt={publishedFilm[1].title} />
                        <div className={styles.movieInfo}>
                            <h2>{publishedFilm[1].title}</h2>
                            <h3>{publishedFilm[1].genre}, {publishedFilm[1].duration}min</h3>
                            <p>{publishedFilm[1].description}</p>
                            <FilmCrew film={publishedFilm[1]} />
                        </div>
                    </div>
                    ) : (
                        <p>Loading movie...</p>
                    )}
                    <button className={styles.toLiveButton} onClick={() => goToLive(publishedFilm[1].film_id)} >Watch Now</button>
                </div>

                <Schedule publishedFilm={publishedFilm} />

            </div>
        </div>
    )
}

export default Theatre;