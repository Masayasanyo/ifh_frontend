import styles from './sign_up.module.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SignUp() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        userbame: "", 
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
        if (formData.userName !== '' && formData.email !== '' && formData.password !== '') {
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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} >
                <div className={styles.usernameContainer}>
                    <p>Username</p>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div className={styles.emailContainer}>
                    <p>Email</p>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div className={styles.passwordContainer}>
                    <p>Password</p>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <button type='submit'>Continue</button>
            </form>
            <p>If you already have an account? <span onClick={toLogin} className={styles.toLogin}>Log in</span></p>
        </div>
    )   
}

export default SignUp;