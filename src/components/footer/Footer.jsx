import React from 'react';
import styles from './footer.module.css';

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer} >
            <div>
                <p id={styles.copyright}>©{currentYear} Masaya Nishimura</p>
            </div>
        </footer>
    );
}

export default Footer;