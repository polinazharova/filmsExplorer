import {FilmBase} from "../../entities/film/model/types/film.ts";

const storageService = {
    get(key : string, storage = localStorage) {
        const value = storage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    },

    set(key : string, value: FilmBase[] | unknown, storage = localStorage) {
        storage.setItem(key, JSON.stringify(value));
    }
};

export default storageService;