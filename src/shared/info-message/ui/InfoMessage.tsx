import styles from './InfoMessage.module.scss'
import {ReactNode} from "react";

interface Props {
    color : 'red' | 'neutral',
    children: ReactNode,
}

export const InfoMessage = ({color, children} : Props) => {
    return (
            <aside className={color === 'red' ? `${styles["info-message"]} ${styles.red}` : `${styles["info-message"]} ${styles.neutral}`}>
                {children}
            </aside>
        )
}