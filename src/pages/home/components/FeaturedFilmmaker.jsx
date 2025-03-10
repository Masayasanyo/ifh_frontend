import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components.module.css';

function FeaturedFilmmaker() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const openUser = (id) => {
        navigate(`/user/${id}`);
    };

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/featured`, {
                    method: "GET",
                });
    
                const data = await response.json();
                setUsers(data.data);
    
            } catch (error) {
                console.error("Filed to fetch filmmakers: ", error);
            }
        };
        fetchFilms();
    }, []);

    return (
        <div className={styles.section}>
            <h2>🎬 Most popular users</h2>
            <ul className={styles.filmmakerContainer}>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <li key={user.id} className={styles.filmmaker} onClick={() => openUser(user.id)} >
                            {user.profile_image_url ? (
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${user.profile_image_url}`} alt={user.first_name} />
                            ):(
                            <img src={`${process.env.REACT_APP_STORAGE_URL}/storage/profile_images/anonymous_person.png`} alt={user.first_name} />
                            )}
                            <p>{user.first_name} {user.family_name}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading films...</p>
                )}
            </ul>
        </div>
    )
}

export default FeaturedFilmmaker;