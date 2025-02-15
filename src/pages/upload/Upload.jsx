import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './upload.module.css';
import Crew from './crew/Crew';


function Upload() {

    const { user } = useContext(AuthContext);

    const [videoForm, setVideoForm] = useState({
        trailer: null, 
        movie: null, 
        thumbnail: null, 
    });

    const handleFileChange = (event) => {
        const { name } = event.target;
        setVideoForm({
            ...videoForm, 
            [name]: event.target.files[0], 
        })
    };

    const [formData, setFormData] = useState({
        userId: user.id, 
        trailerFilePath: '', 
        movieFilePath: '', 
        thumbnailFilePath: '', 
        title: "", 
        description: "", 
        genre: "",
        crew: [],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value);
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    const uploadFile = async (file, endpoint) => {
        const fileFormData = new FormData();
        fileFormData.append(endpoint, file);

        try {
            const response = await fetch(`http://localhost:3001/upload/${endpoint}`, {
                method: "POST",
                body: fileFormData,
            });
            return await response.json();
        } catch (error) {
            console.error(`Upload ${endpoint} error: `, error);
            return null;
        }
    }

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!videoForm.movie ||!videoForm.trailer || !videoForm.thumbnail || !formData.title || !formData.description || !formData.genre || !formData.crew) {
            console.log(formData.genre);
            alert("Please fill in the blanks.");
            return;
        }

        // console.log("movie:", videoForm.movie);
        // console.log("trailer:", videoForm.trailer);
        // console.log("thumbnail:", videoForm.thumbnail);

        const movieData = await uploadFile(videoForm.movie, "movie");
        const trailerData = await uploadFile(videoForm.trailer, "trailer");
        const thumbnailData = await uploadFile(videoForm.thumbnail, "thumbnail");

        if (!movieData?.filePath || !trailerData?.filePath || !thumbnailData?.filePath) {
            alert("File upload failed. Please try again.");
            return;
        }

        const uploadData = {
            userId: formData.userId,
            movieFilePath: movieData.filePath,
            trailerFilePath: trailerData.filePath,
            thumbnailFilePath: thumbnailData.filePath,
            title: formData.title,
            description: formData.description,
            genre: formData.genre,
            crew: formData.crew,
        };

        try {
            const response = await fetch("http://localhost:3001/upload", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(uploadData), 
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error("Upload Error:", error);
        }
    }


    return (
        <div className={styles.container} >
            <h1>Upload your film</h1>
            <hr />
            <form onSubmit={handleUpload} >
                <div className={styles.uploadForm}>
                    <div className={styles.uploadFormLeft} >
                        <label>
                            Film 
                            <input type="file" name="movie" onChange={handleFileChange} />
                        </label>

                        <label>
                            Trailer
                            <input type="file" name="trailer" onChange={handleFileChange} />
                        </label>

                        <label>
                            Thumbnail
                            <input type="file" name="thumbnail" onChange={handleFileChange} />
                        </label>

                        <label>
                            Title
                            <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleChange} />
                        </label>

                        <label>
                            Description
                            <textarea type="text" name="description" value={formData.description} onChange={handleChange} />
                        </label>

                        <label>
                            Genre
                            <select name="genre" onChange={handleChange}>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="comedy">Comedy</option>
                                <option value="drama">Drama</option>
                                <option value="horror">Horror</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="romance">Romance</option>
                                <option value="thriller">Thriller</option>
                                <option value="mystery">Mystery</option>
                                <option value="crime">Crime</option>
                                <option value="war">War</option>
                                <option value="western">Western</option>
                                <option value="anime">Anime</option>
                                <option value="family">Family</option>
                            </select>
                        </label>
                    </div>
                    <Crew formData={formData} setFormData={setFormData}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Upload;