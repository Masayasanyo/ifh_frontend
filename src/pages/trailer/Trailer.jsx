import React, { useState, useEffect } from 'react';
import styles from './trailer.module.css'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/searchbar/Search';

function Trailer() {

    const [films, setFilms] = useState([]);
    // const [filmGenre, setFilmGenre] = useState("all");

    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    const handleChange = async (event) => {
        const { name, value } = event.target;

        console.log(value);

        if (value === "all") {
            fetchFilms();
        }
        else {
            fetchGenreFilms(value);        
        }
    };

    const fetchGenreFilms = async (genre) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/films/genre`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({genre: genre}), 
            });

            const data = await response.json();
            setFilms(data.data);

            console.log(genre);

        } catch (error) {
            console.error("Filed to fetch films: ", error);
        }
    };

    const fetchFilms = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/films`, {
                method: "GET",
            });

            const data = await response.json();
            setFilms(data.data);
        } catch (error) {
            console.error("Filed to fetch trailers: ", error);
        }
    };

    useEffect(() => {

        const fetchTrailers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films`, {
                    method: "GET",
                });
    
                const data = await response.json();
                setFilms(data.data);
            } catch (error) {
                console.error("Filed to fetch trailers: ", error);
            }
        };

        fetchTrailers();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Trailer</h1>
            <div className={styles.header}>
                <Input setFilms={setFilms} />
                <select name="genre" onChange={handleChange} className={styles.searchGenre}>
                    <option value="all">All</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Horror</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="romance">Romance</option>
                    <option value="thriller">Thriller</option>
                    <option value="mystery">Mystery</option>
                    <option value="crime">Crime</option>
                    <option value="war">War</option>
                    <option value="western">Western</option>
                    <option value="anime">Anime</option>
                    <option value="family">Family</option>
                </select>
            </div>
            <ul className={styles.trailerContainer}>
                {films.length > 0 ? (
                    films.map((film, index) => (
                        <li key={film.id} onClick={() => openFilm(film.id)} className={styles.trailer}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${film.thumbnail_file_path}`} alt={film.title} />
                            <p>{film.title}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading trailers...</p>
                )}
            </ul>
        </div>
    )
}

export default Trailer;