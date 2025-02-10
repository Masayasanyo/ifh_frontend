import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Upload() {

    const { user } = useContext(AuthContext);

    const [video, setVideo] = useState(null);
    const [formData, setFormData] = useState({
        userId: user.id, 
        filePath: '', 
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

    const handleFileChange = (event) => {
        setVideo(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        var data = null;

        if (!video) {
            alert("Please upload a video file");
            return;
        }

        const videoFormData = new FormData();
        videoFormData.append("video", video);

        try {
            const response = await fetch("http://localhost:3001/upload/video", {
                method: "POST",
                body: videoFormData,
            });

            data = await response.json();
            setFormData({
                ...formData,
                filePath: data.filePath,
            })
        } catch (error) {
            console.error("Upload Error:", error);
        }

        if (data) {
            console.log(formData);
            try {
                const response = await fetch("http://localhost:3001/upload", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(formData), 
                });
                if (response.ok) {
                    const data = await response.json();
                } else {
                    alert('Failed');
                }
            } catch (error) {
                console.error("Upload Error:", error);
            }
        }
    }


    return (
        <div>
            <h1>Upload your movie!</h1>
            <form onSubmit={handleUpload}>
                <div>
                    <p>Movie</p>
                    <input 
                        type="file"
                        name="movie"
                        onChange={handleFileChange}>
                    </input>
                </div>
                <div>
                    <div>
                        <p>Title</p>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <p>Description</p>
                        <input 
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}>
                        </input>
                    </div>
                </div>
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default Upload;