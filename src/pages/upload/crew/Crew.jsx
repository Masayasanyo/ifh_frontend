import React, { useState } from 'react';
import styles from './crew.module.css';

function Crew({ formData, setFormData }) {

    const [crewList, setCrewList] = useState([{
        accountId: null,
        username: "",
        firstName: "",
        familyName: "",
        role: "director",
        comment: "",
        suggestionList: []
    }]);

    const handleUser = (event, index, user) => {
        event.preventDefault();

        const updatedList = [...crewList];
        updatedList[index]["accountId"] = user.id;
        updatedList[index]["username"] = user.username;
        updatedList[index].suggestionList = [];
        setCrewList(updatedList);
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
        setCrewList([...crewList, {
            accountId: null,
            username: "",
            firstName: "",
            familyName: "",
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


// import React, { useState } from 'react';
// import styles from './crew.module.css';

// function Crew({ formData, setFormData }) {

//     const [crewList, setCrewList] = useState([{"accountId": null, "username": "", "firstName": "", "familyName": "", "role": "director", "comment": ""}]);

//     const [suggestionList, setSuggestionList] = useState([]);

//     const handleUser = (event, index, user) => {
//         event.preventDefault();

//         const updatedList = [...crewList];
//         updatedList[index]["accountId"] = user.id;
//         updatedList[index]["username"] = user.username;
//         console.log(crewList);
//         setCrewList(updatedList);
//         setSuggestionList([]);         
//     }

//     const searchUser = async (username, index) => {
//         if (username === "") {
//             const updatedList = [...crewList];
//             updatedList[index]["suggestionList"] = [];
//             setSuggestionList([]);
//         }
//         else {
//             try {
//                 const response = await fetch("http://localhost:3001/accounts", {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }, 
//                     body: JSON.stringify({username: username}), 
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log(data.data);
//                     setSuggestionList(data.data);
//                 } else {
//                     // alert('Failed');
//                 }
//             } catch (error) {
//                 console.error("Upload Error:", error);
//             }
//         }
//     }

//     const crewChange  = (index, target) => {

//         const updatedList = [...crewList];

//         if (target.name === "role") {
//             updatedList[index]["role"] = target.value;
//             setCrewList(updatedList);            
//         }  

//         if (target.name === "username") {
//             searchUser(target.value, index);
//             updatedList[index]["username"] = target.value;
//             setCrewList(updatedList);
//         }

//         if (target.name === "firstName") {
//             updatedList[index]["firstName"] = target.value;
//             setCrewList(updatedList);
//         }

//         if (target.name === "familyName") {
//             updatedList[index]["familyName"] = target.value;
//             setCrewList(updatedList);
//         }

//         if (target.name === "comment") {
//             updatedList[index]["comment"] = target.value;
//             setCrewList(updatedList);            
//         }

//         setFormData({
//             ...formData,
//             crew: updatedList, 
//         });
//     }

//     const addCrew  = (event) => {
//         event.preventDefault();
//         setCrewList([...crewList, {"accountId": null, "username": "", "firstName": "", "familyName": "", "role": "director", "comment": ""}]);
//     }

//     const addCancelCrew = (event, index) => {

//         event.preventDefault();

//         const updatedList = crewList.filter((_, i) => i !== index);

//         setCrewList(updatedList);
        
//         setFormData({
//             ...formData,
//             crew: updatedList, 
//         });
//     }

//     return (
//         <div className={styles.crewContainer}>
//             <div className={styles.crewHeader}>
//                 <p>Cast & Crew</p>
//                 <button onClick={addCrew} className={styles.new}>+</button>
//             </div>
//             <div className={styles.crewMain}>
//                 {crewList.map((crew, index) => (
//                 <div key={index} className={styles.crewInputContainer}>
//                     <div className={styles.crewInput}>

//                         <select name="role" onChange={(e) => crewChange(index, e.target)}>
//                             <option value="director">Director</option>
//                             <option value="producer">Producer</option>
//                             <option value="screenwriter">Screenwriter</option>
//                             <option value="actor">Actor</option>
//                             <option value="cinematographer">Cinematographer</option>
//                             <option value="editor">Editor</option>
//                             <option value="camera">Camera Operator</option>
//                             <option value="gaffer">Gaffer</option>
//                             <option value="sound">Sound Designer</option>
//                             <option value="makeup">Makeup Artist</option>
//                             <option value="costume">Costume Designer</option>
//                             <option value="vfx">VFX Artist</option>
//                             <option value="stunt">Stunt Coordinator</option>
//                             <option value="composer">Composer</option>
//                             <option value="other">Other</option>
//                         </select>

//                         <input 
//                             placeholder="Username (If you have an account)"
//                             type="text"
//                             name="username"
//                             value={crew.username}
//                             onChange={(e) => crewChange(index, e.target)}
//                         />

//                         {suggestionList.length > 0 && (
//                             suggestionList.map((user) => (
//                             <div key={user.id} onClick={(event) => handleUser(event, index, user)}>
//                                 {user.profile_image_url ? (
//                                     <img className={styles.userImage} src={`http://localhost:3001${user.profile_image_url}`} alt={user.first_name} />
//                                 ):(
//                                     <img className={styles.userImage} src={"http://localhost:3001/profile_image/anonymous_person.png"} alt={user.first_name} />
//                                 )}
//                                 <p>{user.username}</p>
//                             </div>
//                         )))}

//                         <input 
//                             placeholder="First Name"
//                             type="text"
//                             name="firstName"
//                             value={crew.firstName}
//                             onChange={(e) => crewChange(index, e.target)}
//                         />

//                         <input 
//                             placeholder="Family Name"
//                             type="text"
//                             name="familyName"
//                             value={crew.familyName}
//                             onChange={(e) => crewChange(index, e.target)}
//                         />
                        
//                         <textarea 
//                             placeholder="Comment"
//                             type="text"
//                             name="comment"
//                             onChange={(e) => crewChange(index, e.target)}
//                         />
//                     </div>
//                     <button onClick={(event) => addCancelCrew(event, index)} >×</button>
//                 </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Crew;