import styles from './FilmDetails.module.scss'
import {FilmBase, FilmDetailed} from "../../model/types/film";
import Checkbox from '@mui/material/Checkbox';
import {mapFilmDetailedToFilmBase} from "../../model/lib/mappers";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useState} from "react";
import {filmService} from "@/entities/film";
import {AddFavFilmForm} from "../../../add-fav-film-form";
import {handleFavoriteClick} from "../../model/lib/handlers/handleFavoriteClick";

interface Props {
    film: FilmDetailed;
}

const label = { inputProps: { 'aria-label': 'Добавить в избранное' } };

export const FilmDetails = ({film}: Props) => {
    const basedFilm = mapFilmDetailedToFilmBase(film);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(filmService.getFavoriteFilms()?.some((f : FilmBase) => f.id === basedFilm.id) || false);

    return (
        <div className={styles["film"]}>
            <div className={styles["film-comp"]}>
                <div className={styles["left-comp"]}>
                    <h3>{film.name}</h3>
                    <img className={styles["film-poster"]} src={film.poster} alt="Постер фильма"/>
                </div>
                <div className={styles["right-comp"]}>
                    <span>Год выхода: {film.year}</span>
                    <div className={styles["film-genres"]}>
                        {
                            film.genres?.map(genre => (
                                <span className={styles["genre"]} key={genre}>{genre}</span>
                            ))
                        }
                    </div>
                    <div className={styles["rating-container"]}>
                        Рейтинг:
                        {
                            Object.keys(film.rating).map(key => (
                                <div className={styles["film-rating"]} key={key}>
                                    {key} : <span className={
                                    (film.rating[key] > 7
                                        ? styles["rating__color_green"]
                                        : film.rating[key] > 4
                                            ? styles["rating__color_yellow"]
                                            : styles["rating__color_red"])
                                }>{film.rating[key]}/10</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <Checkbox color="error" checked={isChecked} onClick={(event) => handleFavoriteClick(event, basedFilm, isChecked, setIsChecked, setIsModalOpen)} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </div>
            <article className={styles['film-desc']}>
                {film.description}
            </article>
            <AddFavFilmForm isOpen={isModalOpen} handleClose={() => {setIsModalOpen(false)}} setIsChecked={setIsChecked} film={basedFilm} />
        </div>
    )
}
