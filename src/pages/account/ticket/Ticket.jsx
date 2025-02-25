import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import styles from './ticket.module.css';
import ticket from '../../../assets/ticket.png';
import { useTranslation } from 'react-i18next';

function Ticket() {

    const { t } = useTranslation();

    const { user } = useContext(AuthContext);

    const [ticketsAmount, setTicketsAmount] = useState(0);

    const navigate = useNavigate();

    const goToShop = () => {
        navigate(`/shop`);
    }

    useEffect(() => {
        const getTickets = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tickets`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: user.id}), 
                });

                const data = await response.json();

                console.log(data.data);

                setTicketsAmount(data.data[0].count);
            } catch (error) {
                console.error("Filed to fetch tickets: ", error);
            }
        };

        getTickets();
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.ticket}>
                <h1>{t("Tickets")}</h1>
                <div className={styles.section}>
                    <div className={styles.myticket}>
                        <img id={styles.ticketImage} src={ticket} alt="ticket"/>
                        <p>×</p>
                        <p>{ticketsAmount}</p>
                    </div>
                    <button className={styles.btn} onClick={goToShop} >{t("Get a ticket")}</button>
                </div>
            </div>
        </div>
    )
}

export default Ticket;