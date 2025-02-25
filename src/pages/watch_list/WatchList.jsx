import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './watchlist.module.css';

function WatchList() {

    const { user } = useContext(AuthContext);
    
    const [watchlist, setWatchlist] = useState([]);

    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    useEffect(() => {
        const getWatchlist = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/films/watchlist`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: user.id}), 
                });

                const data = await response.json();
                setWatchlist(data.data)

                console.log(data.data);
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };
        getWatchlist();
    }, [user]);

    return (
        <div className={styles.container}>
            <h1>Watchlist</h1>
            <div>
                <ul className={styles.filmList}>
                    {watchlist.length > 0 ? (
                        watchlist.map((film, index) => (
                            <li key={film.id} onClick={() => openFilm(film.film_id)} className={styles.film}>
                                <img src={`${import.meta.env.VITE_STORAGE_URL}${film.thumbnail_file_path}`} alt={film.title} />
                                <p>{film.title}</p>
                            </li>
                        ))
                    ) : (
                        <p>Your watchlist is empty</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default WatchList;