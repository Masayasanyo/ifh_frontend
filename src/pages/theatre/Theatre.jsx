import React, { useState, useEffect } from 'react';
import styles from './theatre.module.css'
import { useNavigate } from 'react-router-dom';
import FilmCrew from './film_crew/FilmCrew';

function Theatre() {

    const navigate = useNavigate();

    // const [films, setFilms] = useState([]);
    const [publishedFilm, setPublishedFilm] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [duration, setDuration] = useState('');

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };
    const goToLive = (id) => {
        navigate(`/live/${id}`);
    };

    const adjustDuration = async (time) => {
        let second = Math.ceil(time);
        let minute = 0;
        let hour = 0;

        minute = Math.floor(second / 60);
        second = second % 60;

        hour = Math.floor(minute / 60);
        minute = minute % 60;

        let secondStr = '';
        let minuteStr = '';
        let hourStr = '';

        secondStr = `${second} sec`;
        minuteStr = `${minute} min`;
        hourStr = `${hour} hr`;

        setDuration(`${hourStr} ${minuteStr} ${secondStr}`)       
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
        const fetchFilms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films`, {
                    method: "GET",
                });

                const data = await response.json();
                setPublishedFilm(data.data.filter(film => film.is_published === true));
                adjustDuration(data.data[0].duration);
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
                        <img onClick={() => openFilm(publishedFilm[0].id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[0].thumbnail_file_path}`} alt={publishedFilm[0].title} />
                        <div className={styles.movieInfo}>
                            <h2>{publishedFilm[0].title}</h2>
                            <h3>{publishedFilm[0].genre}, {duration}</h3>
                            <p>{publishedFilm[0].description}</p>
                            <FilmCrew film={publishedFilm[0]} />
                        </div>
                    </div>
                    ) : (
                        <p>Loading movie...</p>
                    )}
                    <button className={styles.toLiveButton} onClick={() => goToLive(publishedFilm[0].id)} >Watch Now</button>
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
        </div>
    )
}

export default Theatre;