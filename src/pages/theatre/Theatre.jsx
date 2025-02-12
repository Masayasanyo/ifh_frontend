function Theatre() {

    // const [movies, setMovies] = useState([]);
    // const [currentTrailer, setCurrentTrailer] = useState("");

    // useEffect(() => {
    //     const fetchTrailers = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3001/films", {
    //                 method: "GET",
    //             });

    //             const data = await response.json();
    //             console.log(data.data);
    //             setTrailers(data.data);

    //         } catch (error) {
    //             console.error("Filed to fetch trailers: ", error);
    //         }
    //     };
    //     fetchTrailers();
    // }, []);
    
    return (
        <div>
            <h1>What's on</h1>
            <hr />
            {/* <ul className={styles.trailerContainer}>
                {trailers.length > 0 ? (
                    trailers.map((video, index) => (
                        <li key={index} onClick={() => setCurrentTrailer(video)} className={styles.trailer}>
                            <img src={`http://localhost:3001${video.thumbnail_path}`} alt={video.title} />
                            <p>{video.title}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading movies...</p>
                )}
            </ul> */}
        </div>
    )
}

export default Theatre;