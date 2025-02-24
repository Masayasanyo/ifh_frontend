import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            <div className={styles.overlay}></div>
            
            <h1>{filmData[0].title}</h1>
            <div className={styles.video}>
                <video onContextMenu={(e) => e.preventDefault()} autoplay="autoplay" controls controlsList="nodownload noremoteplayback noplaybackrate foobar" playsInline poster={`${process.env.REACT_APP_STORAGE_URL}${filmData[0].thumbnail_file_path}`} src={`${process.env.REACT_APP_STORAGE_URL}${filmData[0].film_file_path}`} />
            </div>
        </div>
    )
}

export default Live;