import styles from './shop.module.css';
import ticket from '../../assets/ticket.png'
import tickets from '../../assets/tickets.png'

function Shop() {
    return (
        <div className={styles.shop}>
            <h1>Shop</h1>

            <div className={styles.container}>

                <div className={styles.section}>
                    <h2>Tickets</h2>

                    <div className={styles.items}>
                        <div className={styles.item}>
                            <h3>Single Ticket</h3>
                            <img src={ticket} />
                            <h3>$3</h3>
                        </div>

                        <div className={styles.item}>
                            <h3>10-Ticket Bundle</h3>
                            <img src={tickets} />
                            <h3>$25</h3>
                        </div>
                    </div>

                </div>

                {/* <div className={styles.section}>
                    <h2>Food & Drinks</h2>
                </div> */}

            </div>
            
        </div>
    )
}

export default Shop;