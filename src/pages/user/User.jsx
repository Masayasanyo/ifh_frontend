import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './user.module.css';

function User() {

    const { userId } = useParams(); 

    const [userData, setUserData] = useState([]);

    const [workList, setWorkList] = useState([]);

    const navigate = useNavigate();

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    const getWork = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_STORAGE_URL}/films/works`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({userId: id}), 
            });

            const data = await response.json();
            setWorkList(data.data)
        } catch (error) {
            console.error("Filed to fetch user's works: ", error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/data`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: userId}), 
                });

                const data = await response.json();
                setUserData(data.data);
                getWork(data.data[0].id);
            } catch (error) {
                console.error("Filed to fetch the user: ", error);
            }
        };

        if (userId) {
            getUser();
        }
    }, [userId]);

    if (userData.length < 1) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                {userData[0].profile_image_url ? (
                <img src={`${process.env.REACT_APP_STORAGE_URL}${userData[0].profile_image_url}`} alt={userData[0].first_name} />
                ):(
                <img src={`${process.env.REACT_APP_STORAGE_URL}/storage/profile_images/anonymous_person.png`} alt={userData[0].first_name} />
                )}
                <div>
                    <h1>{userData[0].first_name} {userData[0].family_name}</h1>
                    <p>{}</p>
                </div>
            </div>
            <div>
                {workList.length > 0 && (
                    <ul className={styles.movieContainer}>
                    {workList.map((work, index) => (
                        <li key={work.film_id} onClick={() => openFilm(work.film_id)} className={styles.movie}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${work.thumbnail_file_path}`} alt={work.title} />
                            <p>{work.title}</p>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default User;