import styles from './FilmCard.module.scss'
import {FilmBase} from "../../model/types/film";
import IMDBLogo from "@images/IMDB-logo.png"
import {useNavigate} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useState} from "react";
import {filmService} from "../../model/lib/filmService";
import {AddFavFilmForm} from "../../../add-fav-film-form";
import {handleFavoriteClick} from "../../model/lib/handlers/handleFavoriteClick.ts";

interface Props {
    film: FilmBase;
}

const label = { inputProps: { 'aria-label': 'Добавить в избранное' } };

export const FilmCard = ({film} : Props)=> {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(filmService.getFavoriteFilms()?.some((f : FilmBase) => f.id === film.id) || false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/film/" + film.id);
    }

    return (
        <div onClick={handleClick} aria-label="Карточка фильма" aria-labelledby="film-title" className={styles["film-card"]} tabIndex={1}>
            <h3 id="film-title" className={styles["film-title"]}>{film.enName ? `${film.name}[${film.enName}]` : film.name}</h3>
            <img aria-hidden={true} className={styles["film-poster"]} src={film.poster} alt="Постер фильма"/>
            <span>Год: {film.year}</span>
            <div className={styles["rating-container"]}>
                <img className={styles["imdb-logo"]} aria-hidden={true} src={IMDBLogo} alt="IMDB логотип"/>
                <div
                    className={styles["film-rating"]}
                >
                  Рейтинг: <span className={
                        (film.rating > 7
                            ? styles["rating__color_green"]
                            : film.rating > 4
                                ? styles["rating__color_yellow"]
                                : styles["rating__color_red"])
                    }>{film.rating}/10</span>
                </div>
            </div>
            <div>
                <Checkbox color="error" checked={isChecked} onClick={(event) => handleFavoriteClick(event, film, isChecked, setIsChecked, setIsModalOpen)} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </div>
            <AddFavFilmForm isOpen={isModalOpen} handleClose={() => {setIsModalOpen(false)}} setIsChecked={setIsChecked} film={film} />
        </div>
    )
}
