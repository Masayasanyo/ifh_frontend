import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Home() {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <h2>News</h2>
            <h2>Events</h2>
        </div>
    )
}

export default Home;