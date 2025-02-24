import React, { useState, useEffect } from 'react';
import styles from './crew.module.css';

function Crew({ filmId, formData, setFormData }) {

    const [crewList, setCrewList] = useState([{
        account_id: null,
        username: "",
        first_name: "",
        family_name: "",
        role: "director",
        comment: "",
        suggestionList: []
    }]);

    useEffect(() => {

        const getCrew = async (id, data) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/crews`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({filmId: filmId}), 
                });
    
                const crewData = await response.json();

                for (var i = 0; i < crewData.data.length; i++) {
                    crewData.data[i].suggestionList = [];
                }

                setCrewList(crewData.data);

                setFormData({
                    ...formData,
                    crew: crewData.data, 
                });

            } catch (error) {
                console.error("Filed to fetch crews: ", error);
            }
        };

        if (filmId) {
            getCrew();
        }
    }, [filmId]);
    
    const handleUser = (event, index, user) => {
        event.preventDefault();

        const updatedList = [...crewList];
        updatedList[index].account_id = user.id;
        updatedList[index].username = user.username;
        updatedList[index].suggestionList = [];

        setCrewList(updatedList);

        setFormData({
            ...formData,
            crew: updatedList, 
        });
    }

    const searchUser = async (username, index) => {
        const updatedList = [...crewList];

        if (username === "") {
            updatedList[index].suggestionList = [];
        }
        else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({username: username}), 
                });
                if (response.ok) {
                    const data = await response.json();

                    updatedList[index].suggestionList = data.data;

                    setCrewList(updatedList);
                    
                } else {
                    updatedList[index].suggestionList = [];
                }
            } catch (error) {
                console.error("Upload Error:", error);
                updatedList[index].suggestionList = [];
            }
        }
    }

    const crewChange  = (index, target) => {

        const updatedList = [...crewList];

        if (target.name === "role") {
            updatedList[index]["role"] = target.value;
            setCrewList(updatedList);            
        }  

        if (target.name === "username") {
            searchUser(target.value, index);
            updatedList[index]["username"] = target.value;

            console.log(updatedList);
            setCrewList(updatedList);
        }

        if (target.name === "firstName") {
            updatedList[index]["first_name"] = target.value;
            setCrewList(updatedList);
        }

        if (target.name === "familyName") {
            updatedList[index]["family_name"] = target.value;
            setCrewList(updatedList);
        }

        if (target.name === "comment") {
            updatedList[index]["comment"] = target.value;
            setCrewList(updatedList);            
        }

        setCrewList(updatedList);

        setFormData({
            ...formData,
            crew: updatedList, 
        });
    }

    const addCrew  = (event) => {
        event.preventDefault();
        setCrewList([...crewList, {
            account_id: null,
            username: "",
            first_name: "",
            family_name: "",
            role: "director",
            comment: "",
            suggestionList: []
        }]);
    }

    const addCancelCrew = (event, index) => {

        event.preventDefault();

        const updatedList = crewList.filter((_, i) => i !== index);

        setCrewList(updatedList);
        
        setFormData({
            ...formData,
            crew: updatedList, 
        });
    }

    if (crewList.length < 1) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.crewContainer}>
            <div className={styles.crewHeader}>
                <p>Cast & Crew</p>
                <button onClick={addCrew} className={styles.new}>+</button>
            </div>
            <div className={styles.crewMain}>
                {crewList.map((crew, index) => (
                <div key={index} className={styles.crewInputContainer}>
                    <button onClick={(event) => addCancelCrew(event, index)} >×</button>
                    <div className={styles.crewInput}>

                        <select value={crew.role} name="role" onChange={(e) => crewChange(index, e.target)}>
                            <option value="director">Director</option>
                            <option value="producer">Producer</option>
                            <option value="screenwriter">Screenwriter</option>
                            <option value="actor">Actor</option>
                            <option value="cinematographer">Cinematographer</option>
                            <option value="editor">Editor</option>
                            <option value="camera">Camera Operator</option>
                            <option value="gaffer">Gaffer</option>
                            <option value="sound">Sound Designer</option>
                            <option value="makeup">Makeup Artist</option>
                            <option value="costume">Costume Designer</option>
                            <option value="vfx">VFX Artist</option>
                            <option value="stunt">Stunt Coordinator</option>
                            <option value="composer">Composer</option>
                            <option value="other">Other</option>
                        </select>

                        <input 
                            placeholder="Username (If you have an account)"
                            type="text"
                            name="username"
                            value={crew.username}
                            onChange={(e) => crewChange(index, e.target)}
                        />

                        <div className={styles.suggestionContainer}>
                            {crew.suggestionList.length > 0 && (
                                crew.suggestionList.map((user) => (
                                <div key={user.id} onClick={(event) => handleUser(event, index, user)}>
                                    {user.profile_image_url ? (
                                        <img className={styles.userImage} src={`${process.env.REACT_APP_STORAGE_URL}${user.profile_image_url}`} alt={user.first_name} />
                                    ):(
                                        <img className={styles.userImage} src={`${process.env.REACT_APP_STORAGE_URL}/storage/profile_images/anonymous_person.png`} alt={user.first_name} />
                                    )}
                                    <p>{user.username}</p>
                                </div>
                            )))}
                        </div>

                        <input 
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            value={crew.first_name}
                            onChange={(e) => crewChange(index, e.target)}
                        />

                        <input 
                            placeholder="Family Name"
                            type="text"
                            name="familyName"
                            value={crew.family_name}
                            onChange={(e) => crewChange(index, e.target)}
                        />
                        
                        <textarea 
                            placeholder="Comment"
                            type="text"
                            name="comment" 
                            value={crew.comment}
                            onChange={(e) => crewChange(index, e.target)}
                        />
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Crew;