import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './user.module.css';
import { AuthContext } from '../../context/AuthContext';

function User() {

    const location = useLocation();
    const { userInfo } = location.state || {};

    const [workList, setWorkList] = useState([]);

    const navigate = useNavigate();

    const openMovie = (id) => {
        navigate(`/movie/${id}`);
    };
    
    useEffect(() => {
        const getWork = async () => {
            try {
                const response = await fetch("http://localhost:3001/user/work", {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({userId: userInfo[0].id || userInfo[0].account_id}), 
                });

                const data = await response.json();
                setWorkList(data.data)
            } catch (error) {
                console.error("Filed to fetch user's works: ", error);
            }
        };
        getWork();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                {userInfo[0].profile_image_url ? (
                <img src={`http://localhost:3001${userInfo[0].profile_image_url}`} alt={userInfo[0].first_name} />
                ):(
                <img src={"http://localhost:3001/profile_image/anonymous_person.png"} alt={userInfo[0].first_name} />
                )}
                <div>
                    <h1>{userInfo[0].first_name} {userInfo[0].family_name}</h1>
                    <p>{}</p>
                </div>
            </div>
            <div>
                {workList.length > 0 && (
                    <ul className={styles.movieContainer}>
                    {workList.map((work, index) => (
                        <li key={work.film_id} onClick={() => openMovie(work.film_id)} className={styles.movie}>
                            <img src={`http://localhost:3001${work.thumbnail_path}`} alt={work.title} />
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