import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import styles from './login.module.css';

function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        if (formData.email !== '' && formData.password !== '') {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(formData), 
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Login Successful:', data);
                    login(data.data);
                    navigate('/');
                } else {
                    alert('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server Error');
            }
        }
        else {
            alert('Please provide a valid input!');
        }
    }

    const toSignUp = () => {
        navigate('/sign_up');
    }

    return (
        <div className={styles.login}>
            <h1>Log in</h1>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <p>Email</p>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Password</p>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <button type='submit'>Continue</button>
                </form>
                <p>Don't have an account? <span onClick={toSignUp} id={styles.toSignUp}>Sign Up</span></p>
            </div>
        </div>
    )
}

export default Login;