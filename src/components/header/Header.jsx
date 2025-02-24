import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../../assets/logo.png';
import HomeIcon from '../icons/HomeIcon';
import UploadIcon from '../icons/UploadIcon';
import AccountIcon from '../icons/AccountIcon';
import CinemaIcon from '../icons/CinemaIcon';
import Play from '../icons/PlayIcon';
import ShopIcon from '../icons/ShopIcon';
import WatchlistIcon from '../icons/WatchlistIcon';
import { useTranslation } from 'react-i18next';


function Header() {

    const { t } = useTranslation();

    const { user, login, logout } = useContext(AuthContext);

    let location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <div>
            <header className={styles.header}>
            
                <Link to='/' className={styles.logo} >
                    <img src={logo} alt='logo' />
                </Link>
                
                <div className={styles.section}>
                    <Link to='/' className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                        <HomeIcon />
                        <h2>{t("home")}</h2>
                    </Link>
                    <Link to='/upload' className={`${styles.link} ${location.pathname === '/upload' ? styles.active : ''}`}>
                        <UploadIcon />
                        <h2>{t("upload")}</h2>
                    </Link>
                    <Link to='/trailer' className={`${styles.link} ${location.pathname === '/trailer' ? styles.active : ''}`}>
                        <Play />
                        <h2>{t("trailer")}</h2>
                    </Link>
                    <Link to='/theatre' className={`${styles.link} ${location.pathname === '/theatre' ? styles.active : ''}`}>
                        <CinemaIcon />
                        <h2>{t("theatre")}</h2>
                    </Link>
                    <Link to='/shop' className={`${styles.link} ${location.pathname === '/shop' ? styles.active : ''}`}>
                        <ShopIcon />
                        <h2>{t("shop")}</h2>
                    </Link>
                    <Link to='/watchlist' className={`${styles.link} ${location.pathname === '/watchlist' ? styles.active : ''}`}>
                        <WatchlistIcon />
                        <h2>{t("watchlist")}</h2>
                    </Link>

                    <Link id={styles.user} to='/account'>
                        {user ? (
                            <div   className={`${styles.user} ${styles.link} ${location.pathname === '/account' ? styles.active : ''}`}>
                                {user.profile_image_url ? (
                                <img id={styles.profileImage} src={`${process.env.REACT_APP_STORAGE_URL}${user.profile_image_url}`} alt={user.first_name} />
                                ):(
                                <img id={styles.profileImage} src={`${process.env.REACT_APP_STORAGE_URL}/storage/profile_images/anonymous_person.png`} alt={user.first_name} />
                                )}
                                <h2 id={styles.username}>{user.username}</h2>
                            </div>
                        ):(
                            <div  className={`${styles.user} ${styles.link} ${location.pathname === '/account' ? styles.active : ''}`}>
                                <AccountIcon />
                                <h2>{t("login")}</h2>
                            </div>
                        )}                        
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Header;