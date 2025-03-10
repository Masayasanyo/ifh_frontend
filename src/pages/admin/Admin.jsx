import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.css';
import Ranking from './ranking/Ranking';

function Admin() {

    const [isRankingOpen, setIsRankingOpen] = useState(false);

    const [filmRanking, setFilmRanking] = useState([]);

    const [scheduledFilm, setScheduledFilm] = useState([]);

    const [weekDates, setWeekDates] = useState([]);

    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    const toSchedule = async (id) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/schedule/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({filmId: id, date: '2025-02-28 09:00:00'}), 
            });
        } catch (error) {
            console.error("Upload Error:", error);
        }
    };

    useEffect(() => {

        const getWeekDates = () => {
            const dates = [];
            const options = { weekday: 'long' };
            for (let i = 0; i < 10; i++) {
                const day = new Date();
                day.setDate(day.getDate() + i);
                const dateStr = day.toLocaleDateString("ja-JP");
                const dayOfWeek = day.toLocaleDateString("en-US", options); 
                dates.push(`${dateStr} (${dayOfWeek})`);
                dates.push(`${dateStr} (${dayOfWeek})`);
            }
            setWeekDates(dates);

            console.log(dates);
            return dates;
        };

        const fetchRanking = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/ranking`, {
                    method: "GET",
                });

                const data = await response.json();
                console.log(data.data);
                setFilmRanking(data.data);
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };

        const fetchSchedule = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/schedule`, {
                    method: "GET",
                });

                const data = await response.json();
                console.log(data.data);
                setScheduledFilm(data.data);
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };

        getWeekDates();

        fetchRanking();

        fetchSchedule();
    }, []);

    console.log(scheduledFilm);
    console.log(weekDates);

    const openRanking = (event) => {
        event.preventDefault();

        setIsRankingOpen(true);
    }

    return (
        <div className={styles.adminPage}>

            <h1>Admin Page</h1>

            {isRankingOpen && (
                <Ranking setIsRankingOpen={setIsRankingOpen} />
            )}

            <div className={styles.section}>
                <h2>Schedule</h2>
                
                {/* <ul className={styles.filmsList}>
                {(scheduledFilm.length > 0 && weekDates.length > 0) && (
                    scheduledFilm.map((film, index) => (
                        <li key={index} className={styles.container}>
                            <p>{weekDates[index]}</p>
                            <div className={styles.film}>
                                <img id={styles.image} onClick={() => openFilm(film.film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${film.thumbnail_file_path}`} alt={film.title} />
                                <div className={styles.movieInfo}>
                                    <h3>{film.title}</h3>
                                    <h4>{film.genre}, {film.duration}min</h4>
                                    <h5>{film.description}</h5>
                                </div>
                            </div>
                        </li>
                    ))
                )}
                </ul> */}


                <ul className={styles.filmsList}>
                {weekDates.length > 0 && (
                    weekDates.map((weekDate, index) => (
                        <li key={index} className={styles.container}>
                            <p>{weekDate}</p>
                            {scheduledFilm[index] ? (
                                <div>
                                    <p>{scheduledFilm[index].title}</p>
                                </div>
                            ):(
                                <div>
                                    <button onClick={openRanking}>add</button>
                                </div>
                            )}
                        </li>
                    ))
                )}
                </ul>


            </div>

        </div>
    )
}

export default Admin;