import styles from './film_crew.module.css';

function FilmCrew({crew}) {

    const directorList = crew.filter(member => member.role === "director") || [];
    const producerList = crew.filter(member => member.role === "producer");
    const screenwriterList = crew.filter(member => member.role === "screenwriter");
    const actorList = crew.filter(member => member.role === "actor");
    const cinematographerList = crew.filter(member => member.role === "cinematographer");
    const editorList = crew.filter(member => member.role === "editor");
    const cameraList = crew.filter(member => member.role === "camera");
    const gafferList = crew.filter(member => member.role === "gaffer");
    const soundList = crew.filter(member => member.role === "sound");
    const makeupList = crew.filter(member => member.role === "makeup");
    const costumeList = crew.filter(member => member.role === "costume");
    const vfxList = crew.filter(member => member.role === "vfx");
    const stuntList = crew.filter(member => member.role === "stunt");
    const composerList = crew.filter(member => member.role === "composer");
    const otherList = crew.filter(member => member.role === "other");

    console.log(directorList);

    return (
        <div className={styles.container}>
            <h2>Cast & Crew</h2>
            {directorList.length > 0 && (
            <div>
                <h3>Director</h3>
                <ul>
                {directorList.map((member, index) => (
                    <li key={member.id} className={styles.member} >
                        {member.crew_username ? (
                            <img />
                        ):
                            <img src={"http://localhost:3001/profile_image/anonymous_person.png"} alt={member.first_name}/>
                        }
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {producerList.length > 0 && (
            <div>
                <h3>Producer</h3>
                <ul>
                {producerList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {screenwriterList.length > 0 && (
            <div>
                <h3>Screenwriter</h3>
                <ul>
                {screenwriterList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {actorList.length > 0 && (
            <div>
                <h3>Actor</h3>
                <ul>
                {actorList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {cinematographerList.length > 0 && (
            <div>
                <h3>Cinematographer</h3>
                <ul>
                {cinematographerList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {editorList.length > 0 && (
            <div>
                <h3>Editor</h3>
                <ul>
                {editorList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {cameraList.length > 0 && (
            <div>
                <h3>Camera Operator</h3>
                <ul>
                {cameraList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {gafferList.length > 0 && (
            <div>
                <h3>Gaffer</h3>
                <ul>
                {gafferList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {soundList.length > 0 && (
            <div>
                <h3>Sound Designer</h3>
                <ul>
                {soundList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {makeupList.length > 0 && (
            <div>
                <h3>Makeup Artist</h3>
                <ul>
                {makeupList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {costumeList.length > 0 && (
            <div>
                <h3>Costume Designer</h3>
                <ul>
                {costumeList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {vfxList.length > 0 && (
            <div>
                <h3>VFX Artist</h3>
                <ul>
                {vfxList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {stuntList.length > 0 && (
            <div>
                <h3>Stunt Coordinator</h3>
                <ul>
                {stuntList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {composerList.length > 0 && (
            <div>
                <h3>Composer</h3>
                <ul>
                {composerList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}

            {otherList.length > 0 && (
            <div>
                <h3>Other</h3>
                <ul>
                {otherList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>      
    )
}

export default FilmCrew;