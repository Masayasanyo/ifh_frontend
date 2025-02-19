import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styles from "./live.module.css";

function Live() {

    const { filmId } = useParams(); 

    const [filmData, setFilmData] = useState([]);

    useEffect(() => {
        const getFilm = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films/data`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: filmId}), 
                });

                const data = await response.json();
                setFilmData(data.data);
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
        <div>
            <h1>{filmData[0].title}</h1>
            <hr />
            <div className={styles.video}>
                <ReactPlayer width='1280px' height='720px' url={`${process.env.REACT_APP_STORAGE_URL}${filmData[0].film_file_path}`} controls light/>
            </div>
        </div>
    )
}

export default Live;