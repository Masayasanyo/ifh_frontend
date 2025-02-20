import React, { useState, useEffect } from 'react';
import styles from './filmcrew.module.css';

function FilmCrew({film}) {

    const [crew, setCrew] = useState([]);
        
    useEffect(() => {
        const getCrew = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/crews`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: film.id}), 
                });

                const data = await response.json();
                setCrew(data.data)
            } catch (error) {
                console.error("Filed to fetch crews: ", error);
            }
        };
        getCrew();
    }, []);

    const directorList = crew.filter(member => member.role === "director") || [];
    const screenwriterList = crew.filter(member => member.role === "screenwriter");
    const actorList = crew.filter(member => member.role === "actor");
    
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3>Director</h3>
                <ul>
                {directorList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>

            {/* <div className={styles.section}>
                <h3>Screenwriter</h3>
                <ul>
                {screenwriterList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div> */}

            <div className={styles.section}>
                <h3>Actor</h3>
                <ul>
                {actorList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
        </div>      
    )
}

export default FilmCrew;