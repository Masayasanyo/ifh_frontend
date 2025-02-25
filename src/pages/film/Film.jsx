import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './film.module.css';
import FilmCrew from './film_crew/FilmCrew';
import Checkbox from '../../components/button/like/LikeButton';
import SaveButton from '../../components/button/save/SaveButton';
import { AuthContext } from '../../context/AuthContext';

function Film() {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { filmId } = useParams(); 

    const [filmData, setFilmData] = useState([]);
    const [crew, setCrew] = useState([]);
    const [year, setYear] = useState(null);

    const edit = (id) => {
        navigate(`/edit/${id}`);
    };

    const getCrew = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/crews`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({filmId: id}), 
            });

            const data = await response.json();
            setCrew(data.data)
        } catch (error) {
            console.error("Filed to fetch crews: ", error);
        }
    };

    useEffect(() => {
        const getFilm = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/films/data`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: filmId}), 
                });

                const data = await response.json();
                console.log(data.data);
                setYear(data.data[0].created_at.split("-")[0]);
                setFilmData(data.data);
                getCrew(data.data[0].id);
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };

        if (filmId) {
            getFilm();
        }
    }, [filmId]);

    if (filmData.length < 1) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>


            <div className={styles.section}>

                {user.id === filmData[0].user_id && (
                    <button id={styles.edit} onClick={() => edit(filmId)} >Edit</button>
                )}

                <div className={styles.filmContainer}>
                    <video onContextMenu={(e) => e.preventDefault()} controls controlsList="nodownload noremoteplayback noplaybackrate foobar" playsInline poster={`${import.meta.env.VITE_STORAGE_URL}${filmData[0].thumbnail_file_path}`} src={`${import.meta.env.VITE_STORAGE_URL}${filmData[0].trailer_file_path}`} />
                    <div className={styles.filmInfo}>
                        <h1>{filmData[0].title}</h1>
                        <h2>{year}, {filmData[0].genre}, {filmData[0].duration}min</h2>
                        <p>{filmData[0].description}</p>
                        <div className={styles.iconContainer}>
                            <SaveButton film={filmData[0]} />
                            <Checkbox user={user} film={filmData[0]} />
                        </div>
                    </div>
                </div>
            </div>
            
            <FilmCrew crew={crew} />   
        </div>
    )
}

export default Film;