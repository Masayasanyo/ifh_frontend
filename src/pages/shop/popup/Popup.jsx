import styles from "./popup.module.css";
import { useNavigate } from 'react-router-dom';

function Popup({ setIsPopup}) {

    const navigate = useNavigate();

    const handleOk = () => {
        setIsPopup(false);
        navigate(`/shop`);
    };

    return (

        <div>

            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div className={styles.section}>
                    <h1>Thank you!</h1>
                    <h2>We hope you have a great time watching the movies.</h2>
                </div>

                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handleOk} >Ok</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;