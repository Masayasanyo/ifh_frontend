import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './account.module.css';

function Account() {

    const { user, login, logout } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: user.username, 
        email: user.email, 
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
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                const data = await response.json();
                login(data.data);
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
            <form onSubmit={handleSubmit}>
                <h2>Username</h2>
                <input
                    className={styles.accountInput}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}>
                </input>
                <button>Update username</button>
            </form>

            <hr />

            <form onSubmit={handleSubmit}>
                <h2>Email</h2>
                <input 
                    className={styles.accountInput}
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}>
                </input>
                <button>Update email address</button>
            </form>

            <hr />

            <form onSubmit={handleSubmit}>
                <h2>Password</h2>
                <input 
                    className={styles.accountInput}
                    type="text"
                    name="password" 
                    placeholder='New password'
                    onChange={handleChange}>
                </input>
                <input 
                    className={styles.accountInput}
                    type="text"
                    name="password" 
                    placeholder='Confirm password'
                    onChange={handleChange}>
                </input>
                <button>Update password</button>
            </form>

            <hr />

            <div>
                <button onClick={logout} >Log out</button>
            </div>

        </div>
    )
}

export default Account;