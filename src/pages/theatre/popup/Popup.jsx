import React, { useState, useContext, useEffect } from 'react';
import styles from "./popup.module.css";
import ticket from '../../../assets/ticket.png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

function Popup({ setIsPopup, filmId, filmTitle }) {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [ticketsAmount, setTicketsAmount] = useState(0);

    const goToShop = () => {
        setIsPopup(false);
        navigate(`/shop`);
    }

    const handleOk = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/use`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: user.id}), 
            });

            const data = await response.json();

            console.log(data.data);

        } catch (error) {
            console.error("Filed to use a ticket: ", error);
        }

        setIsPopup(false);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/history/watched`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: user.id, filmId: filmId}), 
            });

            const data = await response.json();

        } catch (error) {
            console.error("Filed to update your viewing history: ", error);
        }

        navigate(`/live/${filmId}`);
    } 

    const handleCancel = () => {
        setIsPopup(false);
    }

    useEffect(() => {
        const getTickets = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
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

        <div>

            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>Would you like to use a ticket to watch {filmTitle}?</h1>
                    <div>
                        <h2>Your tickets</h2>
                        <div id={styles.myticket}>
                            <img id={styles.ticket} src={ticket} alt="ticket"/>
                            <p>×</p>
                            <p>{ticketsAmount}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.btns}>
                    {ticketsAmount > 0 ? (
                        <button className={styles.btn} onClick={handleOk} >Ok</button>
                    ) : (
                        <button className={styles.btn} onClick={goToShop} >Get a ticket</button>
                    )}
                    
                    <button id={styles.cancel} className={styles.btn} onClick={handleCancel} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;