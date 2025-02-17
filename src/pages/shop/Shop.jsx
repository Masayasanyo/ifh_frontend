import styles from './shop.module.css';

function Shop() {
    return (
        <div className={styles.shop}>
            <h1>Shop</h1>

            <div className={styles.section}>
                <h2>Tickets</h2>
            </div>

            <div className={styles.section}>
                <h2>Food & Drinks</h2>
            </div>
            
        </div>
    )
}

export default Shop;