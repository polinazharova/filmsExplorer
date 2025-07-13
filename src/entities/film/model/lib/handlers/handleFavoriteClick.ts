import {filmService} from "../filmService.ts";
import {FilmBase} from "../../types/film.ts";
import {Dispatch, SetStateAction} from "react";

export const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>, film : FilmBase, isChecked : boolean, setIsChecked: Dispatch<SetStateAction<boolean>>, setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>) => {
    event.stopPropagation();
    if (isChecked) {
        filmService.removeFavoriteFilm(film);
        setIsChecked((prev : boolean) => !prev);
        return;
    }
    setIsModalOpen(true);
}