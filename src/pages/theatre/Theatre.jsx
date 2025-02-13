import React, { useState, useEffect } from 'react';
import styles from './theatre.module.css'
import { useNavigate } from 'react-router-dom';

function Theatre() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [publishedMovie, setPublishedMovie] = useState([]);
    const [weekDates, setWeekDates] = useState([]);

    const openMovie = (id) => {
        const movie = movies.filter(movie => movie.id === id);
        console.log(movie);
        navigate("/movie", { state: { movie } });
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

    console.log(publishedMovie);

    return (
        <div>
            <h1>What's on</h1>
            <hr />
            <div className={styles.liveNowContainer} >
                <h2>Live Now</h2>
                {publishedMovie.length > 0 ? (
                <div onClick={() => openMovie(publishedMovie[0].id)} className={styles.movie}>
                    <img src={`http://localhost:3001${publishedMovie[0].thumbnail_path}`} alt={publishedMovie[0].title} />
                    <div>
                        <h3>{publishedMovie[0].title}</h3>
                        <p>{publishedMovie[0].description}</p>
                    </div>
                </div>
                ) : (
                    <p>Loading movie...</p>
                )}
                <button className={styles.toLiveButton} onClick={() => goToLive()} >Watch Now</button>
            </div>

            <hr />

            <h2>Schedule</h2>
            <ul className={styles.scheduleContainer}>
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
    )
}

export default Theatre;