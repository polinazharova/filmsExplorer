import {filmService} from "../filmService.ts";
import {useSearchParams} from "react-router-dom";
import {runInAction} from "mobx";
import {useEffect} from "react";

export const useFilmParams = () => {
    const [searchParams] = useSearchParams();
    useEffect(() => {

        const rating = searchParams.get('rating');
        if (rating) {
            runInAction(() => {
                filmService.setRating(rating);
            })
        }
        console.log(rating);
        const year = searchParams.get('year');
        if (year) {
            runInAction(() => {
                filmService.setYear(year);
            })
        }
        console.log(year)
        const genre = searchParams.getAll('genre');
        if (genre && genre.length > 0) {
            console.log('ВЫСТАВЛЯЮ ЖАНР')
            runInAction(() => {
                filmService.setGenre(genre);
            })
        }
    }, []);
}