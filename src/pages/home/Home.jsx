import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import LatestFilms from './components/LatestFilms';
import TrendingFilms from './components/TrendingFilms';
import FeaturedFilmmaker from './components/FeaturedFilmmaker';

function Home() {

    const { user } = useContext(AuthContext);

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const openMovie = (id) => {
        const movie = movies.filter(movie => movie.id === id);
        console.log(movie);
        navigate("/movie", { state: { movie } });
    };

    

    return (
        <div>
            <h1>Show Your Film to the World</h1>
            {/* Hero Section */}
            <div className={styles.home}>
                <section className={styles.hero}>
                    <p>Join Indie Film Hub and connect with your audience</p>
                    <div className={styles.buttons}>
                    <Link to="/theatre" className={styles.btn}>Watch Movies</Link>
                    <Link to="/upload" className={styles.btn}>Upload Your Film</Link>
                    </div>
                </section>

                <TrendingFilms />
                <LatestFilms/>
                <FeaturedFilmmaker />

                {/* News & Events */}
                <section className={styles.section}>
                    <h2>📰 News & Events</h2>
                    <p>🏆 Indie Film Festival 2025 is coming soon!</p>
                    {/* <Link to="/live" className={styles.btn}>Learn More</Link> */}
                </section>
            </div>

        </div>
    );
};

export default Home;
