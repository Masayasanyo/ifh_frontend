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
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.username !== '' && formData.email !== '' && formData.password !== '' && formData.firstName !== '' && formData.familyName !== '') {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(formData), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Sign up success:', data);
                    login(data.user);
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
        <div className={styles.signUpContainer} >
            <h1>Sign Up</h1>
            <form className={styles.inputForm} onSubmit={handleSubmit} >

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
            <p>If you already have an account? <span onClick={toLogin} className={styles.toLogin}>Log in</span></p>
        </div>
    )   
}

export default SignUp;