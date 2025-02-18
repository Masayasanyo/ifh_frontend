import React, { useContext, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'
import styles from './movie.module.css';
import FilmCrew from './film_crew/FilmCrew';
import Checkbox from '../../components/button/LikeButton';
import { AuthContext } from '../../context/AuthContext';

function Movie() {
    const { user } = useContext(AuthContext);

    const { filmId } = useParams(); 

    const [movieData, setMovieData] = useState([]);
    const [crew, setCrew] = useState([]);
    const [year, setYear] = useState(null);


    const getCrew = async (id) => {
        try {
            const response = await fetch("http://localhost:3001/members", {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({filmId: id}), 
            });

            const data = await response.json();
            setCrew(data.data)
            console.log(data.data);
        } catch (error) {
            console.error("Filed to fetch movies: ", error);
        }
    };

    useEffect(() => {
        const getMovie = async () => {

            console.log(filmId);


            try {
                const response = await fetch("http://localhost:3001/film/data", {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: filmId}), 
                });

                const data = await response.json();
                console.log(data.data);
                setYear(data.data[0].created_at.split("-")[0]);
                console.log(year);
                setMovieData(data.data);
                getCrew(data.data[0].id);
            } catch (error) {
                console.error("Filed to fetch movies: ", error);
            }
        };

        // getMovie();

        if (filmId) {
            getMovie();
        }
    }, [filmId]);
    // }, []);

    if (movieData.length < 1) {
        console.log(movieData);
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <video controls controlslist="nodownload noremoteplayback noplaybackrate foobar" playsinline poster={`http://localhost:3001${movieData[0].thumbnail_path}`} src={`http://localhost:3001${movieData[0].trailer_path}`} />
                <div className={styles.filmInfo}>
                    <h1>{movieData[0].title}</h1>
                    <h2>({year}) {movieData[0].genre}</h2>
                    <p>{movieData[0].description}</p>
                    <Checkbox user={user} movie={movieData[0]} />
                </div>
            </div>
            
            <FilmCrew crew={crew} />   
        </div>
    )
}

export default Movie;