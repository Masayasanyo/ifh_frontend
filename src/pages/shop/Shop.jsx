import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './shop.module.css';
import ticket from '../../assets/ticket.png'
import tickets from '../../assets/tickets.png'
import Popup from './popup/Popup';

function Shop() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [isPopup, setIsPopup] = useState(false);

    const getSingleTicket = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tickets/get/single`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: user.id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                setIsPopup(true);
                navigate('/shop');
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }

    const getBundleTicket = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tickets/get/bundle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: user.id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setIsPopup(true);
                navigate('/shop');
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }


    return (
        <div className={styles.shop}>
            <h1>Shop</h1>

            {isPopup && (
                <Popup setIsPopup={setIsPopup} />
            )}

            <div className={styles.container}>

                <div className={styles.section}>
                    <h2>Tickets</h2>

                    <div className={styles.items}>
                        <div className={styles.item}>
                            <h3>Single Ticket</h3>
                            <img src={ticket} />
                            <h3>$3</h3>
                            <button className={styles.btn} onClick={getSingleTicket}>Get</button>
                        </div>

                        <div className={styles.item}>
                            <h3>10-Ticket Bundle</h3>
                            <img src={tickets} />
                            <h3>$25</h3>
                            <button className={styles.btn} onClick={getBundleTicket}>Get</button>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default Shop;