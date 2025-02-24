import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './edit_film.module.css';
import Crew from './crew/Crew';


function EditFilm() {

    const { user } = useContext(AuthContext);
    const { filmId } = useParams();
    const navigate = useNavigate();


    const [filmData, setFilmData] = useState([]);

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

        if (!formData.title || !formData.description || !formData.genre || formData.crew.length < 1) {
            alert("Please fill in the blanks.");
            return;
        }
        if (!filmDuration) {
            alert("Please wait a moment");
            return;
        }

        const uploadData = {
            userId: formData.userId,
            filmFilePath: formData.filmFilePath,
            trailerFilePath: formData.trailerFilePath,
            thumbnailFilePath: formData.thumbnailFilePath,
            title: formData.title,
            description: formData.description,
            genre: formData.genre,
            crew: formData.crew,
            duration: filmDuration, 
            filmId: filmData[0].id, 
        };

        if (videoForm.film) {
            const filmData = await uploadFile(videoForm.film, "film");
            uploadData.filmFilePath = filmData.filePath;
        }
        if (videoForm.trailer) {
            const trailerData = await uploadFile(videoForm.trailer, "trailer");
            uploadData.trailerFilePath = trailerData.filePath;
        }
        if (videoForm.thumbnail) {
            const thumbnailData = await uploadFile(videoForm.thumbnail, "thumbnail");
            uploadData.thumbnailFilePath = thumbnailData.filePath;
        } 

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/update`, {
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

    useEffect(() => {
        const getFilm = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/films/data`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: filmId}), 
                });

                const data = await response.json();
                setFilmData(data.data);
                setFormData({
                    ...formData,
                    trailerFilePath: data.data[0].trailer_file_path,  
                    filmFilePath: data.data[0].film_file_path,  
                    thumbnailFilePath: data.data[0].thumbnail_file_path, 
                    title: data.data[0].title, 
                    description: data.data[0].description, 
                    genre: data.data[0].genre,
                });
                setFileUrl({
                    trailer: `${process.env.REACT_APP_STORAGE_URL}${data.data[0].trailer_file_path}`, 
                    film: `${process.env.REACT_APP_STORAGE_URL}${data.data[0].film_file_path}`, 
                    thumbnail: `${process.env.REACT_APP_STORAGE_URL}${data.data[0].thumbnail_file_path}`, 
                })
            } catch (error) {
                console.error("Filed to fetch films: ", error);
            }
        };

        if (filmId) {
            getFilm();
        }
    }, [filmId]);

    if (filmData.length < 1) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles.upload} >
            <h1>Edit</h1>
            <form onSubmit={handleUpload} >

                
                <div className={styles.btns}>
                    <button className={styles.btn} type='submit'>Submit</button>
                    <button className={styles.btn} id={styles.delete} type="button" >Delete</button>
                </div>


                <div className={styles.form}>
                    <div className={styles.section} >

                        <div>
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

                        <div>
                            <label>
                                Title
                                <input id={styles.title} type="text" name="title" value={formData.title} onChange={handleChange} />
                            </label>

                            <label>
                                Description
                                <textarea id={styles.description} type="text" name="description" value={formData.description} onChange={handleChange} />
                            </label>

                            <label>
                                Genre
                                <select value={formData.genre} id={styles.role} name="genre" onChange={handleChange}>
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

                    </div>

                    <Crew filmId={filmId} formData={formData} setFormData={setFormData}/>
                
                </div>
            </form>
        </div>
    )
}

export default EditFilm;