import {FilmBase, FilmDetailed, FilmDTO} from "../types/film.ts";
import noPoster from "@images/no-poster.png"

export const mapFilmDetailedToFilmBase = (film: FilmDetailed) : FilmBase => {
    return {
        id : film.id,
        poster : film.poster,
        name : film.name,
        enName : film.enName,
        year : film.year,
        rating : film.rating.imdb,
    }
}

export const mapApiFilmToFilmBase  = (apiFilm : FilmDTO) : FilmBase => {
    return {
        id : apiFilm.id,
        poster : apiFilm.poster?.previewUrl || apiFilm.poster?.url || noPoster,
        name : apiFilm.name || apiFilm.alternativeName,
        enName : apiFilm.enName,
        year : apiFilm.year,
        rating : apiFilm.rating.imdb,
    }
}

export const mapApiFilmToFilmDetailed = (apiFilm : FilmDTO) : FilmDetailed => {
    return {
        id : apiFilm.id,
        poster : apiFilm?.poster?.previewUrl || apiFilm?.poster?.url || noPoster,
        name : apiFilm.name || apiFilm.alternativeName,
        enName : apiFilm.enName,
        year : apiFilm.year,
        description : apiFilm.description || "Нет описания.",
        rating : apiFilm.rating,
        genres : apiFilm.genres.map(genre => genre.name) || "Жанры не указаны.",
    }
}