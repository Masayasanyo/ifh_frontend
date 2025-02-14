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


    return (
        <div>
            <h2>Cast & Crew</h2>
            <div>
                <h3>Director</h3>
                <ul>
                {directorList.map((member, index) => (
                    <li key={member.id} >
                        <p>{member.first_name} {member.family_name}</p>
                    </li>
                ))}
                </ul>
            </div>

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
        </div>      
    )
}

export default FilmCrew;