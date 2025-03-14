import styles from './sign_up.module.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SignUp() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "", 
        firstName: "", 
        familyName: "", 
        email: "", 
        password: "", 
        bio: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }

    const [fileForm, setFileForm] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        setFileForm(event.target.files[0]);
        if (event.target.files[0]) {
            const url = URL.createObjectURL(event.target.files[0]);
            setImageUrl(url);
        }
    };

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
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const profileImageData = await uploadFile(fileForm, "profile_image");

        if (formData.username !== '' && formData.email !== '' && formData.password !== '' && formData.firstName !== '' && formData.familyName !== '') {
            
            const newFormData = {
                username: formData.username, 
                firstName: formData.firstName, 
                familyName: formData.familyName, 
                email: formData.email, 
                password: formData.password, 
                bio: formData.bio, 
                imagePath: profileImageData.filePath,
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(newFormData), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Sign up success:', data.data);
                    login(data.data);
                    navigate('/');
                } else {
                    alert('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error');
            }
        }
        else {
            alert('Please provide a valid input!');
        }
    }

    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.signup}>
            <h1>Sign Up</h1>

            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit} >

                        <label className={styles.imageInput}>
                            Profile picture 
                            <input type="file" name="picture" onChange={handleFileChange} />
                            <img src={imageUrl} alt='' />
                        </label>

                        <label className={styles.inputContainer}>
                            Username
                            <input 
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            >
                            </input>
                        </label>

                        <label className={styles.inputContainer}>
                            Bio
                            <textarea 
                                id={styles.bio}
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                            >
                            </textarea>
                        </label>

                        <label className={styles.inputContainer}>
                            First Name
                            <input 
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            >
                            </input>
                        </label>

                        <label className={styles.inputContainer}>
                            Family Name
                            <input 
                                type="text"
                                name="familyName"
                                value={formData.familyName}
                                onChange={handleChange}
                            >
                            </input>
                        </label>
                    
                        <label className={styles.inputContainer}>
                            Email
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            >
                            </input>
                        </label>

                        <label className={styles.inputContainer}>
                            Password
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            >
                            </input>
                        </label>

                    <button type='submit'>Continue</button>

                </form>
                <p>If you already have an account? <span onClick={toLogin} id={styles.toLogin}>Log in</span></p>
            </div>
        </div>
    )   
}

export default SignUp;