import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink
                    to="/favorite"
                    className={({ isActive }) =>
                        isActive ? `${styles["nav-link"]} ${styles["nav-link-active"]}` : styles["nav-link"]
                    }
                >
                    Избранное
                </NavLink>
            </nav>
            <div className={styles.divider}></div>
        </header>
    )
}
