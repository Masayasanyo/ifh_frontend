import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../../assets/logo.png';
import HomeIcon from '../icons/HomeIcon';
import UploadIcon from '../icons/UploadIcon';
import AccountIcon from '../icons/AccountIcon';
import CinemaIcon from '../icons/CinemaIcon';
import Play from '../icons/PlayIcon';
import ShopIcon from '../icons/ShopIcon';
import WatchlistIcon from '../icons/WatchlistIcon';

function Header() {

    let location = useLocation()

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt='logo' />
                </div>
                <div className={styles.section}>
                    <Link to='/' className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                        <HomeIcon />
                        <h2>Home</h2>
                    </Link>
                    <Link to='/upload' className={`${styles.link} ${location.pathname === '/upload' ? styles.active : ''}`}>
                        <UploadIcon />
                        <h2>Upload</h2>
                    </Link>
                    <Link to='/trailer' className={`${styles.link} ${location.pathname === '/trailer' ? styles.active : ''}`}>
                        <Play />
                        <h2>Trailer</h2>
                    </Link>
                    <Link to='/theatre' className={`${styles.link} ${location.pathname === '/theatre' ? styles.active : ''}`}>
                        <CinemaIcon />
                        <h2>Theatre</h2>
                    </Link>
                    <Link to='/shop' className={`${styles.link} ${location.pathname === '/shop' ? styles.active : ''}`}>
                        <ShopIcon />
                        <h2>Shop</h2>
                    </Link>
                    <Link to='/watchlist' className={`${styles.link} ${location.pathname === '/watchlist' ? styles.active : ''}`}>
                        <WatchlistIcon />
                        <h2>Watchlist</h2>
                    </Link>
                    <Link to='/account' className={`${styles.link} ${location.pathname === '/account' ? styles.active : ''}`}>
                        <AccountIcon />
                        <h2>Account</h2>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Header;