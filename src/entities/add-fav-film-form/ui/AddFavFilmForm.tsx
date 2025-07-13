import styles from './AddFavFilmForm.module.scss'
import {Modal} from '../../../shared/modal'
import {Dispatch, FormEvent, SetStateAction} from "react";
import {filmService} from "../../film";
import {FilmBase} from "../../film/model/types/film.ts";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    setIsChecked: Dispatch<SetStateAction<boolean>>;
    film: FilmBase;
}

export const AddFavFilmForm = ({isOpen, handleClose, setIsChecked, film}: Props) => {

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        filmService.addFavoriteFilm(film);
        setIsChecked(prev => !prev);
        handleClose();
    }

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <form className={styles['add-fav-form']} onSubmit={onSubmit}>
                <p>Добавить в избранное?</p>
                <div className={styles['btn-comp']}>
                    <button className={styles['accept-btn']} type='submit'>Добавить</button>
                    <button className={styles['cancel-btn']} onClick={handleClose} type='button'>Отменить</button>
                </div>
            </form>
        </Modal>
    )
}