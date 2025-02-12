import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './upload.module.css';


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
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
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

        if (!videoForm.movie ||!videoForm.trailer || !videoForm.thumbnail || !formData.title || !formData.description ) {
            alert("Please fill in the blanks.");
            return;
        }

        console.log("movie:", videoForm.movie);
        console.log("trailer:", videoForm.trailer);
        console.log("thumbnail:", videoForm.thumbnail);

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
        <div>
            <h1>Upload your movie!</h1>
            <form onSubmit={handleUpload} className={styles.uploadForm}>
                <label>
                    Movie 
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Upload;