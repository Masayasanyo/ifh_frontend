import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import styles from './work.module.css';
import { useTranslation } from 'react-i18next';

function Work() {

    const { t } = useTranslation();
    
    const { user } = useContext(AuthContext);

    const [works, setWorks] = useState([]);

    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    useEffect(() => {
        const getWork = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_STORAGE_URL}/films/works`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: user.id}), 
                });
    
                const data = await response.json();
                setWorks(data.data)
            } catch (error) {
                console.error("Filed to fetch user's works: ", error);
            }
        };
    
        getWork();
    }, [user]);
    
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.works}>

                <h1>Works</h1>
                {works.length > 0 && (
                    <ul className={styles.filmList}>
                    {works.map((work, index) => (
                        <li key={work.film_id} onClick={() => openFilm(work.film_id)} className={styles.film}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${work.thumbnail_file_path}`} alt={work.title} />
                            <p>{work.title}</p>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Work;