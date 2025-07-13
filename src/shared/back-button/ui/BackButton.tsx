import styles from "./BackButton.module.scss"
import {useNavigate} from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

    return (
        <button className={styles['back-btn']} type="button" onClick={onClick}>Назад</button>
    )
}