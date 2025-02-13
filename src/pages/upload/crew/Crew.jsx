import React, { useState } from 'react';
import styles from './crew.module.css';

function Crew() {

    const [crewList, setCrewList] = useState([{"name": "", "role": "", "character": ""}]);
    const [searchList, setSearchList] = useState([]);

    const searchAccount = async (name) => {

        if (!name) {
            setSearchList([]);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/accounts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({"username": name}), 
        });
        if (response.ok) {
            const data = await response.json();
            setSearchList(data.data || []);
        } else {
            console.log('Failed');
        }
        } catch (error) {
            console.error('Error:', error);
            console.log('Server error');
        }
    }

    const crewChange  = (index, target) => {
        const updatedList = [...crewList];
        if (target.name === "name") {
            console.log(target.value);
            setCrewList(updatedList);
            searchAccount(target.value);
            
            // updatedList[index]["name"] = value;
        }        
        // setFormData({
        //     ...formData,
        //     recipeLabel: updatedLabel, 
        // });
    }

    const selectCrew = (index, id, username) => {
        const updatedList = [...crewList];
        updatedList[index]["name"] = username;
        setCrewList(updatedList);
        setSearchList([]); 
    };

    const addCrew  = (event) => {
        event.preventDefault();
        setCrewList([...crewList, {"name": "", "role": "", "character": ""}]);
    }

    const addCancelCrew = (event, index) => {
        event.preventDefault();
        const updatedList = crewList.filter((_, i) => i !== index);
        setCrewList(updatedList);
        // setFormData({
        //     ...formData,
        //     recipeLabel: updatedLabel, 
        // });
    }

    return (
        <div className={styles.crewContainer}>
            <div className={styles.crewHeader}>
                <p>Cast & Crew</p>
                <button onClick={addCrew} className={styles.new}>+</button>
            </div>
            <div>
                {crewList.map((crew, index) => (
                <div key={index} className={styles.crewInputContainer}>
                    <button onClick={(event) => addCancelCrew(event, index)} >×</button>
                    <div className={styles.crewInput}>
                        <select>
                            <option>Director</option>
                        </select>
                        <input 
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={crew.name}
                            onChange={(e) => crewChange(index, e.target)}
                        />

                        
                        {searchList.length > 0 && (
                            <ul className={styles.suggestionList}>
                            {searchList.map((user) => (
                                <li key={user.id} onClick={() => selectCrew(index, user.id, user.username)}>{user.username}</li>
                            ))}
                            </ul>
                        )}
                        
                        <textarea 
                            placeholder="Comment"
                            type="text"
                            name="comment"
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