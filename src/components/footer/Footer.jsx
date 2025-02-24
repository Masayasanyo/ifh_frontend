import React from 'react';
import styles from './footer.module.css';
import { useTranslation } from 'react-i18next';

function Footer({ changeLanguage }) {

    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer} >
            <div>
                {/* <div className={styles.btns}>
                    <button className={styles.btn} onClick={() => changeLanguage('ja')}>{t("ja")}</button>
                    <button className={styles.btn} onClick={() => changeLanguage('en')}>{t("en")}</button>
                </div> */}
                <p id={styles.copyright}>©{currentYear} Masaya Nishimura</p>
            </div>
        </footer>
    );
}

export default Footer;