import React, { useState, useEffect } from 'react';
import styles from './schedule.module.css'
import { useNavigate } from 'react-router-dom';

function Schedule({ publishedFilm }) {

    const navigate = useNavigate();

    const [weekDates, setWeekDates] = useState([]);

    const openFilm = (id) => {
        navigate(`/film/${id}`);
    };

    const getWeekDates = () => {
        const dates = [];
        const options = { weekday: 'long' };
        for (let i = 1; i < 8; i++) {
            const day = new Date();
            day.setDate(day.getDate() + i);
            const dateStr = day.toLocaleDateString("ja-JP");
            const dayOfWeek = day.toLocaleDateString("en-US", options); 
            dates.push(`${dateStr} (${dayOfWeek})`);
        }
        setWeekDates(dates);
        return dates;
    };

    useEffect(() => {
        getWeekDates();
    }, []);

    return (
        <div className={`${styles.scheduleContainer} ${styles.section}`}>
            {publishedFilm.length > 0 ? (
            <ul>

                {(publishedFilm[2] && publishedFilm[3]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[0]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[2].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[2].thumbnail_file_path}`} alt={publishedFilm[2].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[2].title}</h3>
                                    <h4>{publishedFilm[2].genre}, {publishedFilm[2].duration}min</h4>
                                    <h5>{publishedFilm[2].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[3].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[3].thumbnail_file_path}`} alt={publishedFilm[3].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[3].title}</h3>
                                    <h4>{publishedFilm[3].genre}, {publishedFilm[3].duration}min</h4>
                                    <h5>{publishedFilm[3].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

                {(publishedFilm[4] && publishedFilm[5]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[1]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[4].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[4].thumbnail_file_path}`} alt={publishedFilm[4].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[4].title}</h3>
                                    <h4>{publishedFilm[4].genre}, {publishedFilm[4].duration}min</h4>
                                    <h5>{publishedFilm[4].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[5].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[5].thumbnail_file_path}`} alt={publishedFilm[5].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[5].title}</h3>
                                    <h4>{publishedFilm[5].genre}, {publishedFilm[5].duration}min</h4>
                                    <h5>{publishedFilm[5].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

                {(publishedFilm[6] && publishedFilm[7]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[2]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[6].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[6].thumbnail_file_path}`} alt={publishedFilm[6].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[6].title}</h3>
                                    <h4>{publishedFilm[6].genre}, {publishedFilm[6].duration}min</h4>
                                    <h5>{publishedFilm[6].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[7].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[7].thumbnail_file_path}`} alt={publishedFilm[7].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[7].title}</h3>
                                    <h4>{publishedFilm[7].genre}, {publishedFilm[7].duration}min</h4>
                                    <h5>{publishedFilm[7].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

                {(publishedFilm[8] && publishedFilm[9]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[3]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[8].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[8].thumbnail_file_path}`} alt={publishedFilm[8].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[8].title}</h3>
                                    <h4>{publishedFilm[8].genre}, {publishedFilm[8].duration}min</h4>
                                    <h5>{publishedFilm[8].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[9].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[9].thumbnail_file_path}`} alt={publishedFilm[9].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[9].title}</h3>
                                    <h4>{publishedFilm[9].genre}, {publishedFilm[9].duration}min</h4>
                                    <h5>{publishedFilm[9].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

                {(publishedFilm[10] && publishedFilm[11]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[4]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[10].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[10].thumbnail_file_path}`} alt={publishedFilm[10].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[10].title}</h3>
                                    <h4>{publishedFilm[10].genre}, {publishedFilm[10].duration}min</h4>
                                    <h5>{publishedFilm[10].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[11].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[11].thumbnail_file_path}`} alt={publishedFilm[11].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[11].title}</h3>
                                    <h4>{publishedFilm[11].genre}, {publishedFilm[11].duration}min</h4>
                                    <h5>{publishedFilm[11].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

                {(publishedFilm[12] && publishedFilm[13]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[5]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[12].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[12].thumbnail_file_path}`} alt={publishedFilm[12].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[12].title}</h3>
                                    <h4>{publishedFilm[12].genre}, {publishedFilm[12].duration}min</h4>
                                    <h5>{publishedFilm[12].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[13].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[13].thumbnail_file_path}`} alt={publishedFilm[13].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[13].title}</h3>
                                    <h4>{publishedFilm[13].genre}, {publishedFilm[13].duration}min</h4>
                                    <h5>{publishedFilm[13].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

                {(publishedFilm[14] && publishedFilm[15]) && 
                    <li className={styles.day}>
                        <h2>{weekDates[6]}</h2>
                        <div className={styles.films}>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[14].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[14].thumbnail_file_path}`} alt={publishedFilm[14].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[14].title}</h3>
                                    <h4>{publishedFilm[14].genre}, {publishedFilm[14].duration}min</h4>
                                    <h5>{publishedFilm[14].description}</h5>
                                </div>
                            </div>
                            <div className={styles.film}>
                                <img onClick={() => openFilm(publishedFilm[15].film_id)} src={`${process.env.REACT_APP_STORAGE_URL}${publishedFilm[15].thumbnail_file_path}`} alt={publishedFilm[15].title} />
                                <div className={styles.movieInfo}>
                                    <h3>{publishedFilm[15].title}</h3>
                                    <h4>{publishedFilm[15].genre}, {publishedFilm[15].duration}min</h4>
                                    <h5>{publishedFilm[15].description}</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                }

               
            </ul>
            ) : (
                <p>Loading movie...</p>
            )}
        </div>
    )
}

export default Schedule;