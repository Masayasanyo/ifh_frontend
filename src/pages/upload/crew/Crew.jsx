import React, { useState } from 'react';
import styles from './crew.module.css';

function Crew({ formData, setFormData }) {

    const [crewList, setCrewList] = useState([{"username": "", "firstName": "", "familyName": "", "role": "director", "comment": ""}]);

    const crewChange  = (index, target) => {

        const updatedList = [...crewList];

        if (target.name === "role") {
            updatedList[index]["role"] = target.value;
            setCrewList(updatedList);            
        }  

        if (target.name === "username") {
            updatedList[index]["username"] = target.value;
            setCrewList(updatedList);
        }

        if (target.name === "firstName") {
            updatedList[index]["firstName"] = target.value;
            setCrewList(updatedList);
        }

        if (target.name === "familyName") {
            updatedList[index]["familyName"] = target.value;
            setCrewList(updatedList);
        }

        if (target.name === "comment") {
            updatedList[index]["comment"] = target.value;
            setCrewList(updatedList);            
        }

        setFormData({
            ...formData,
            crew: updatedList, 
        });
    }

    const addCrew  = (event) => {
        event.preventDefault();
        setCrewList([...crewList, {"username": "", "firstName": "", "familyName": "", "role": "director", "comment": ""}]);
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

    return (
        <div className={styles.crewContainer}>
            <div className={styles.crewHeader}>
                <p>Cast & Crew</p>
                <button onClick={addCrew} className={styles.new}>+</button>
            </div>
            <div className={styles.crewMain}>
                {crewList.map((crew, index) => (
                <div key={index} className={styles.crewInputContainer}>
                    <div className={styles.crewInput}>

                        <select name="role" onChange={(e) => crewChange(index, e.target)}>
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

                        <input 
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            value={crew.firstName}
                            onChange={(e) => crewChange(index, e.target)}
                        />

                        <input 
                            placeholder="Family Name"
                            type="text"
                            name="familyName"
                            value={crew.familyName}
                            onChange={(e) => crewChange(index, e.target)}
                        />
                        
                        <textarea 
                            placeholder="Comment"
                            type="text"
                            name="comment"
                            onChange={(e) => crewChange(index, e.target)}
                        />
                    </div>
                    <button onClick={(event) => addCancelCrew(event, index)} >×</button>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Crew;