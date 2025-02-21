import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './upload.module.css';
import Crew from './crew/Crew';


function Upload() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [videoForm, setVideoForm] = useState({
        trailer: null, 
        film: null, 
        thumbnail: null, 
    });

    const [fileUrl, setFileUrl] = useState({
        trailer: null, 
        film: null, 
        thumbnail: null, 
    });

    const handleFileChange = (event) => {
        const { name } = event.target;

        if (!event.target.files[0]) {
            return;
        }

        const url = URL.createObjectURL(event.target.files[0]);

        setVideoForm({
            ...videoForm, 
            [name]: event.target.files[0], 
        })

        setFileUrl({
            ...fileUrl, 
            [name]: url, 
        })
    };

    const [formData, setFormData] = useState({
        userId: user.id, 
        trailerFilePath: '', 
        filmFilePath: '', 
        thumbnailFilePath: '', 
        title: "", 
        description: "", 
        genre: "action",
        crew: [],
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/${endpoint}`, {
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

        const vid = document.getElementById("film");
        const filmDuration = Math.ceil(vid.duration / 60);

        if (!filmDuration) {
            alert("Please wait a moment");
            return;
        }

        if (!videoForm.film ||!videoForm.trailer || !videoForm.thumbnail || !formData.title || !formData.description || !formData.genre || !formData.crew) {
            alert("Please fill in the blanks.");
            return;
        }

        const filmData = await uploadFile(videoForm.film, "film");
        const trailerData = await uploadFile(videoForm.trailer, "trailer");
        const thumbnailData = await uploadFile(videoForm.thumbnail, "thumbnail");

        if (!filmData?.filePath || !trailerData?.filePath || !thumbnailData?.filePath) {
            alert("File upload failed. Please try again.");
            return;
        }

        const uploadData = {
            userId: formData.userId,
            filmFilePath: filmData.filePath,
            trailerFilePath: trailerData.filePath,
            thumbnailFilePath: thumbnailData.filePath,
            title: formData.title,
            description: formData.description,
            genre: formData.genre,
            crew: formData.crew,
            duration: filmDuration, 
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(uploadData), 
            });
            if (response.ok) {
                const data = await response.json();
                navigate('/');
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
            <form onSubmit={handleUpload} >

                <button type='submit'>Submit</button>


                <div className={styles.uploadForm}>
                    <div className={styles.formOne} >
                        <label>
                            Film 
                            <input type="file" name="film" onChange={handleFileChange} />
                            <video id='film' src={fileUrl.film} alt='Film Preview' />
                        </label>

                        <label>
                            Trailer
                            <input type="file" name="trailer" onChange={handleFileChange} />
                            <video src={fileUrl.trailer} alt='Trailer Preview' />
                        </label>

                        <label>
                            Thumbnail
                            <input type="file" name="thumbnail" onChange={handleFileChange} />
                            <img src={fileUrl.thumbnail} alt='' />
                        </label>
                    </div>

                    <div className={styles.formTwo}>
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
            </form>
        </div>
    )
}

export default Upload;