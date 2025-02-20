import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import LatestFilms from './components/LatestFilms';
import TrendingFilms from './components/TrendingFilms';
import FeaturedFilmmaker from './components/FeaturedFilmmaker';
import News from './components/News';

function Home() {   

    return (
        <div>
            <h1>Show Your Film to the World</h1>
            
            <div className={styles.home}>

                <section className={styles.hero}>
                    <p>Join Indie Film Hub and connect with your audience</p>
                    <div className={styles.buttons}>
                        <Link to="/theatre" className={styles.btn}>What's on</Link>
                        <Link to="/upload" className={styles.btn}>Upload Your Film</Link>
                    </div>
                </section>

                <TrendingFilms />
                <LatestFilms/>
                <FeaturedFilmmaker />
                <News />
                
            </div>

        </div>
    );
};

export default Home;
