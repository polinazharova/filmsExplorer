import apiService from "../../../../shared/api/axios.ts";
import {FilmDTO} from "../types/film.ts";
import axios from "axios";

const filmApi = {
    async getFilms(params?: object) {
        try {
            const response = await apiService.get<{docs : FilmDTO[]}>(`/v1.4/movie`, {
                type: "movie",
                limit: 50,
                ...params,
            });
            return response.docs;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw new Error(e.response?.data?.message || e.message);
            }
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error(String(e));
        }

    },
    async getFilm(id: number, params?: object) {
        try {
            const response = await apiService.get<FilmDTO>(`/v1.4/movie/${id}`, { params });
            return response;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw new Error(e.response?.data?.message || e.message);
            }
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error(String(e));
        }
    }
}

export default filmApi;