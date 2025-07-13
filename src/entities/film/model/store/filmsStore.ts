import {makeAutoObservable, runInAction} from 'mobx';
import {FilmBase, FilmDetailed} from "../types/film.ts";
import filmApi from "../api/filmApi.ts";
import {mapApiFilmToFilmBase, mapApiFilmToFilmDetailed} from "../lib/mappers.ts";

class FilmStore {
    films: FilmBase[] | null = null;
    film: FilmDetailed | null = null;
    error : null | string = null;
    status : "idle" | "loading" = "idle";
    page = 1;
    year = "1990-2025";
    genre : string[] = [];
    rating = "0-10";
    favoriteFilms : FilmBase[] | null = null;
    hasMorePages : boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    setFavoriteFilms(films: FilmBase[]) {
        this.favoriteFilms = films;
    }

    addFavoriteFilm(film: FilmBase) {
        this.favoriteFilms?.push(film);
    }

    removeFavoriteFilm(film: FilmBase) {
        const filtredFilms = this.favoriteFilms?.filter((currFilm : FilmBase) => currFilm.id !== film.id) || null
        this.favoriteFilms = filtredFilms;
    }

    async addFilms() {
        try {
            this.status = "loading";
            this.error = null;

            const films = await filmApi.getFilms({
                page: this.page,
                year: this.year,
                'genres.name': this.genre,
                'rating.imdb' : this.rating,
            });
            runInAction(() => {
                this.hasMorePages = !(films.length < 50);
                if (this.films) {
                    this.films = [...this.films, ...films.map(film => mapApiFilmToFilmBase(film))];
                } else {
                    this.films = films.map(film => mapApiFilmToFilmBase(film));
                }
                this.status = "idle";
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : String(e);
                this.status = "idle";
            });
            console.error(e);
        }
    }

    async getFilms() {
        try {
            this.status = "loading";
            this.error = null;

            const films = await filmApi.getFilms({
                page: this.page,
                year: this.year,
                'genres.name': this.genre,
                'rating.imdb' : this.rating,
            });
            runInAction(() => {
                this.films = films.map(film => mapApiFilmToFilmBase(film));
                this.status = "idle";
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : String(e);
                this.status = "idle";
            });
            console.error(e);
        }
    }

    async getFilm(id: number) {
        try {
            this.status = "loading";
            this.error = null;

            const film = await filmApi.getFilm(id);
            runInAction(() => {
                this.film = mapApiFilmToFilmDetailed(film);
                this.status = "idle";
            })
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : String(e);
                this.status = "idle";
            })
            console.error(e);
        }
    }

    setPage(page: number) {
        this.page = page;
    }

    setFilmYear(year : string) {
        this.year = year;
    }

    setFilmGenre(genre : string[]) {
        this.genre = genre;
    }

    setFilmRating(rating : string) {
        this.rating = rating;
    }
}

export const filmStore = new FilmStore();