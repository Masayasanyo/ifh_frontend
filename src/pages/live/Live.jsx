import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styles from "./live.module.css";

function Live() {

    const location = useLocation();
    const { publishedMovie } = location.state || {};
    console.log(`http://localhost:3001${publishedMovie[0].movie_path}`);
    
    return (
        <div>
            <h1>{publishedMovie[0].title}</h1>
            <hr />
            <div className={styles.video}>
                <ReactPlayer width='1280px' height='720px' url={`http://localhost:3001${publishedMovie[0].movie_path}`} controls/>
                {/* <iframe
                    width="1120"
                    height="630"
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1?showinfo=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowfullscreen>
                </iframe> */}
            </div>
            {/* <div className={styles.movieInformation}>
                <h2>{publishedMovie[0].title}</h2>
                <h3>{publishedMovie[0].description}</h3>
            </div> */}
        </div>
    )
}

export default Live;