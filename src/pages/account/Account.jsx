import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './account.module.css';

function Account() {

    const { user, login, logout } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: user.username, 
        firstName: user.firstName, 
        familyName: user.familyName, 
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
        // try {
        //     const response = await fetch(`${process.env.REACT_APP_API_URL}/account`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }, 
        //         body: JSON.stringify(formData), 
        //     });
        //     if (response.ok) {
        //         const data = await response.json();
        //         login(data.data);
        //     } else {
        //         alert('Failed');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('Server error');
        // }
    }


    return (
        <div className={styles.container} >
            <h1>Account</h1>

            <div className={styles.inputForm}>

                <form onSubmit={handleSubmit} className={styles.inputContainer}>
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
                    </label>

                    <button>Submit</button>
                </form>

                <div>
                    <button id={styles.logoutButton} onClick={logout} >Log out</button>
                </div>

            </div>

        </div>
    )
}

export default Account;