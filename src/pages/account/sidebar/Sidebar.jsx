import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';

function Sidebar() {

    let location = useLocation()

    return (
        <div className={styles.container} >
            <Link className={`${styles.link} ${location.pathname === '/account' ? styles.active : ''}`} to='/account' >
                <h2>Account</h2>
            </Link>

            <hr />

            <Link className={`${styles.link} ${location.pathname === '/account/history' ? styles.active : ''}`} to='/account/history' >
                <h2>History</h2>
            </Link>

            <hr />

            <Link className={`${styles.link} ${location.pathname === '/account/ticket' ? styles.active : ''}`} to='/account/ticket' >
                <h2>Ticket</h2>
            </Link>
        </div>
    )
}

export default Sidebar;