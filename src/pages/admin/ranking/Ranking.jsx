import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ranking.module.css'

function Ranking({ setIsRankingOpen }) {

    const [filmRanking, setFilmRanking] = useState([]);

    const navigate = useNavigate();

    const openFilm = (id) => {
        window.open(`/film/${id}`, '_blank');
    };

    const closeRanking = (event) => {
        setIsRankingOpen(false);
    };

    const toSchedule = async (id) => {
        console.log(id);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/schedule/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({filmId: id, date: '2025-03-04 09:00:00', screenNumber: 2}), 
            });
        } catch (error) {
            console.error("Upload Error:", error);
        }

        window.location.reload();
    };

    useEffect(() => {

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

        fetchRanking();
    }, []);

    return (
        <div>

            <div className={styles.overlay}></div>

            <div  className={styles.rankingPage}>

                <button id={styles.cancel} onClick={() => closeRanking()}>×</button>

                <h2>Ranking</h2>

                <ul className={styles.filmsList}>
                {filmRanking.length > 0 && (
                    filmRanking.map((film, index) => (
                        <li key={index} className={styles.container}>
                            <p>{index + 1}</p>
                            <div className={styles.film}>
                                <img id={styles.image} onClick={() => openFilm(film.id)} src={`${process.env.REACT_APP_STORAGE_URL}${film.thumbnail_file_path}`} alt={film.title} />
                                <div className={styles.movieInfo}>
                                    <h3>{film.title}</h3>
                                    <h4>{film.genre}, {film.duration}min</h4>
                                    <h5>{film.description}</h5>
                                </div>
                            </div>
                            <button id={styles.button} onClick={() => toSchedule(film.id)} >add</button>
                        </li>
                    ))
                )}
                </ul>

            </div>

        </div>
    )
}

export default Ranking;