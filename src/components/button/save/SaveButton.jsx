import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from './save_button.module.css';
import SaveIcon from '../../icons/SaveIcon';
import UnsaveIcon from '../../icons/UnsaveIcon';

const SaveButton = ({film}) => {

    const { user } = useContext(AuthContext);

    const [save, setSave] = useState(false);

    useEffect(() => {
        const getInitialSave = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/save`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: user.id, filmId: film.id}), 
                });

                const data = await response.json();
                setSave(data.isSaved)
            } catch (error) {
                console.error("Filed to fetch data: ", error);
            }
        };
        getInitialSave();
    }, [user, film]);

    const handleSave = async (event) => {
        event.preventDefault();
        if (save) {
            try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/save/false`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: user.id, filmId: film.id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSave(false);
            } else {
                alert('Failed');
            }
            } catch (error) {
            console.error('Error:', error);
            alert('Server Error');
            }
        }
        else {
            try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/save/true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: user.id, filmId: film.id}), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSave(true);
            } else {
                alert('Failed');
            }
            } catch (error) {
            console.error('Error:', error);
            alert('Server Error');
            }
        }
    }

    return (
        <div className={styles.container} onClick={handleSave}>
        {save ? 
        <UnsaveIcon className={styles.save} />
        :
        <SaveIcon />
        }
        {save ? 
        <p className={styles.saveWord} >Save</p>
        :
        <p>Save</p>
        }
        </div>
    );
}

export default SaveButton;
