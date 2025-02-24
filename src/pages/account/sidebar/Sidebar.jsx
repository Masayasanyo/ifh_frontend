import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useTranslation } from 'react-i18next';

function Sidebar() {

    const { t } = useTranslation();

    let location = useLocation()

    return (
        <div className={styles.container} >
            <Link className={`${styles.link} ${location.pathname === '/account' ? styles.active : ''}`} to='/account' >
                <h2>{t("Account")}</h2>
            </Link>

            <hr />

            <Link className={`${styles.link} ${location.pathname === '/account/work' ? styles.active : ''}`} to='/account/work' >
                <h2>{t("Works")}</h2>
            </Link>

            <hr />

            <Link className={`${styles.link} ${location.pathname === '/account/history' ? styles.active : ''}`} to='/account/history' >
                <h2>{t("History")}</h2>
            </Link>

            <hr />

            <Link className={`${styles.link} ${location.pathname === '/account/ticket' ? styles.active : ''}`} to='/account/ticket' >
                <h2>{t("Tickets")}</h2>
            </Link>
        </div>
    )
}

export default Sidebar;