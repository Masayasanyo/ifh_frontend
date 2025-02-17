import React, { useState, useEffect } from 'react';
import styles from './theatre.module.css'
import { useNavigate } from 'react-router-dom';
import FilmCrew from './film_crew/FilmCrew';

function Theatre() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [publishedMovie, setPublishedMovie] = useState([]);
    const [weekDates, setWeekDates] = useState([]);

    const openMovie = (id) => {
        navigate(`/movie/${id}`);
    };
    const goToLive = () => {
        navigate("/live", { state: { publishedMovie } });
    };

    const getWeekDates = () => {
        const dates = [];
        const options = { weekday: 'long' };
        for (let i = 0; i < 7; i++) {
            const day = new Date();
            day.setDate(day.getDate() + i);
            const dateStr = day.toLocaleDateString("ja-JP");
            const dayOfWeek = day.toLocaleDateString("en-US", options); 
            dates.push(`${dateStr} (${dayOfWeek})`);
        }
        setWeekDates(dates);
        return dates;
    };

    useEffect(() => {
        getWeekDates();
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3001/films", {
                    method: "GET",
                });

                const data = await response.json();
                console.log(data.data);
                setMovies(data.data);
                setPublishedMovie(data.data.filter(movie => movie.is_published === true));
            } catch (error) {
                console.error("Filed to fetch movies: ", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className={styles.whatson}>
            <h1>What's on</h1>
            <div className={`${styles.liveNowContainer} ${styles.section}`} >
                {publishedMovie.length > 0 ? (
                <div className={styles.movie}>
                    <div className={styles.movieInfo}>
                        <h2>{publishedMovie[0].title}</h2>
                        <p>{publishedMovie[0].description}</p>
                        <FilmCrew movie={publishedMovie[0]} />

                    </div>
                    <img onClick={() => openMovie(publishedMovie[0].id)} src={`http://localhost:3001${publishedMovie[0].thumbnail_path}`} alt={publishedMovie[0].title} />
                </div>
                ) : (
                    <p>Loading movie...</p>
                )}
                <button className={styles.toLiveButton} onClick={() => goToLive()} >Watch Now</button>
            </div>

            <div className={`${styles.scheduleContainer} ${styles.section}`}>
                <h2>Schedule</h2>
                <ul>
                    {weekDates.length > 0 ? (
                        weekDates.map((date, index) => (
                            <li key={index} className={styles.day}>
                                <h3>{date}</h3>
                            </li>
                        ))
                    ) : (
                        <p>Loading schedule...</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Theatre;