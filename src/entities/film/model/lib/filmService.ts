import storage from "../../../../shared/storage/storage.ts";
import {filmStore} from "../store/filmsStore.ts";
import {FilmBase} from "../types/film.ts";

export const filmService = {
    getFilm(id : number) {
        filmStore.getFilm(id);
    },

    getFilms() {
        filmStore.getFilms();
    },

    getFavoriteFilms(key = "favoriteFilms") {
        return storage.get(key);
    },

    addFavoriteFilm(film : FilmBase, key : string = "favoriteFilms") {
        const films = this.getFavoriteFilms();
        if (films) {
            storage.set(key, [...films, film]);
        } else {
            storage.set(key, [film]);
        }
        if (filmStore.favoriteFilms) {
            filmStore.addFavoriteFilm(film);
        }
    },

    setFavoriteFilms(films : FilmBase[]) {
        filmStore.setFavoriteFilms(films);
    },

    removeFavoriteFilm(film: FilmBase, key : string = "favoriteFilms") {
        const films = this.getFavoriteFilms();
        const filtredFilms = films.filter((currFilm : FilmBase) => currFilm.id !== film.id)
        storage.set(key, filtredFilms);

        if (filmStore.favoriteFilms) {
            filmStore.removeFavoriteFilm(film);
        }
    },

    addPage() {
        const page = filmStore.page;
        filmStore.setPage(page + 1);
    },

    addFilms() {
        this.addPage();
        filmStore.addFilms();
    },

    hasMorePages() {
        return filmStore.hasMorePages;
    },

    getGenre() {
        return filmStore.genre;
    },

    getRating() {
        const rating = filmStore.rating.split('-').map(Number);
        if (rating.length === 1) {
            return [rating[0], rating[0]];
        }
        return rating;
    },

    getYear() {
        const year = filmStore.year.split('-').map(Number);
        if (year.length === 1) {
            return [year[0], year[0]];
        }
        return year;
    },

    setGenre(genre : string[]) {
        filmStore.setFilmGenre(genre);
    },

    setYear(year : number[] | string) {
        if (typeof year === "string") {
            filmStore.setFilmYear(year);
            return;
        }
        const newYear = `${year[0]}-${year[1]}`;
        filmStore.setFilmYear(newYear);
    },

    setRating(rating : number[] | string) {
        const ratingNormalize = (currRating : string) => {
            return currRating === '0-0' ? '0' : currRating;
        }

        if (typeof rating === "string") {
            filmStore.setFilmRating(ratingNormalize(rating));
            return;
        }
        const newRating = `${rating[0]}-${rating[1]}`;
        filmStore.setFilmRating(ratingNormalize(newRating));
    }
}