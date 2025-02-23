import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './account.module.css';
import Sidebar from './sidebar/Sidebar';

function Account() {

    const { user, login, logout } = useContext(AuthContext);

    if (!user) {
        logout();
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user.username, 
        firstName: user.first_name, 
        familyName: user.family_name, 
        email: user.email, 
        password: "",
        passwordConfirmed: "", 
    });

    const [fileForm, setFileForm] = useState(null);
    const [imageUrl, setImageUrl] = useState(user.profile_image_url);

    const handleFileChange = (event) => {
        setFileForm(event.target.files[0]);
        if (event.target.files[0]) {
            const url = URL.createObjectURL(event.target.files[0]);
            setImageUrl(url);
        }
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
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.passwordConfirmed) {
            alert("Passwords don't match");
            return;
        }

        if (formData.username === '' || formData.email === '' || formData.firstName === '' || formData.familyName === '') {
            alert('Please provide a valid input!');
            return;
        }       

        const newFormData = {
            userId: user.id, 
            username: formData.username, 
            firstName: formData.firstName, 
            familyName: formData.familyName, 
            email: formData.email, 
            password: formData.password,
            imagePath: imageUrl,
        }

        if (fileForm) {
            const profileImageData = await uploadFile(fileForm, "profile_image");
            newFormData["imagePath"] = profileImageData.filePath;
        }     

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(newFormData), 
            });
            if (response.ok) {
                const data = await response.json();
                login(data.data);
                navigate('/account');
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }

    return (
        <div className={styles.container} >

            <Sidebar />

            <div className={styles.account} >
                <h1>Account</h1>

                <form onSubmit={handleSubmit} className={styles.section}>

                    <div className={styles.btns}>
                        <button type='submit' id={styles.submit}>Submit</button>
                        <button id={styles.logoutButton} onClick={logout} >Log out</button>
                    </div>

                    <div className={styles.form}>

                        <label className={styles.imageInput}>
                            Profile picture 
                            <input type="file" name="picture" onChange={handleFileChange} />
                            <img src={`${process.env.REACT_APP_STORAGE_URL}${imageUrl}`} alt='' />
                        </label>

                        <label>
                        Username
                            <input
                                className={styles.accountInput}
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}>
                            </input>
                        </label>

                        <label>
                        First Name
                            <input
                                className={styles.accountInput}
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}>
                            </input>
                        </label>

                        <label>
                        Family Name
                            <input
                                className={styles.accountInput}
                                type="text"
                                name="familyName"
                                value={formData.familyName}
                                onChange={handleChange}>
                            </input>
                        </label>

                        <label>
                            Email
                            <input 
                                className={styles.accountInput}
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}>
                            </input>
                        </label>

                        <label>
                            Password
                            <input 
                                className={styles.accountInput}
                                type="password"
                                name="password" 
                                placeholder='New password'
                                onChange={handleChange}>
                            </input>
                            <input 
                                className={styles.accountInput}
                                type="password"
                                name="passwordConfirmed" 
                                placeholder='Confirm password'
                                onChange={handleChange}>
                            </input>
                        </label>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Account;