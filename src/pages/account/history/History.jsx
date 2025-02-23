import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import styles from './history.module.css';

function History() {

    const { user } = useContext(AuthContext);

    const [historyList, setHistoryList] = useState([]);

    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/history`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: user.id}), 
                });

                const data = await response.json();
                setHistoryList(data.data)

                console.log(data.data);
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };
        getHistory();
    }, [user]);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.history}>
                <h1>Viewing history</h1>
                <div>
                    <ul className={styles.filmList}>
                        {historyList.length > 0 ? (
                            historyList.map((film, index) => (
                                <li key={film.id} onClick={() => openFilm(film.film_id)} className={styles.film}>
                                    <img src={`${process.env.REACT_APP_STORAGE_URL}${film.thumbnail_file_path}`} alt={film.title} />
                                    <p>{film.title}</p>
                                </li>
                            ))
                        ) : (
                            <p>Your viewing history is empty</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default History;