import styles from './SortForm.module.scss'
import {RatingSort} from "../rating-sort/RatingSort";
import {GenreSort} from "../genre-sort/GenreSort";
import {YearSort} from "../year-sort/YearSort";
import {filmService, filmStore} from "@/entities/film";
import {useEffect, useState} from "react";

export const SortForm = () => {
    const [year, setYear] = useState<number[]>(filmService.getYear());
    const [rating, setRating] = useState<number[]>(filmService.getRating());
    const [genre, setGenre] = useState<string[]>(filmService.getGenre());

    const onSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        filmService.setGenre(genre);
        filmService.setRating(rating);
        filmService.setYear(year);
    }

    useEffect(() => {
        setYear(filmService.getYear());
    }, [filmStore.year]);

    useEffect(() => {
        setGenre(filmService.getGenre());
    }, [filmStore.genre]);

    useEffect(() => {
        setRating(filmService.getRating());
    }, [filmStore.rating]);

    return (
        <form className={styles.sort} onSubmit={onSubmit}>
            <div className={styles["sort-comp"]}>
                <GenreSort genre={genre} setGenre={setGenre} />
                <RatingSort rating={rating} setRating={setRating} />
                <YearSort year={year} setYear={setYear} />
            </div>
            <button className={styles['submit-btn']} type="submit">Принять</button>
        </form>
    )
}