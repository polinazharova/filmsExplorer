import styles from './Films.module.scss'
import {useEffect} from "react";
import {FilmCard, FilmCardSkeleton, filmService} from "@/entities/film";
import {filmStore} from "@/entities/film";
import {observer} from "mobx-react-lite";
import {FilmBase} from "@/entities/film/model/types/film";
import {useFilmParams} from "@/entities/film/model/lib/hooks/useFilmParams";
import InfiniteScroll from 'react-infinite-scroll-component';
import {InfoMessage} from "@/shared/info-message";

interface Props {
    films?: FilmBase[];
}

export const Films = observer(({films}: Props) => {
    useFilmParams();

    useEffect(() => {
        if (films || filmStore.status === 'loading') {
            return;
        }
        const controller = new AbortController();
        console.log('REQ')
        filmService.getFilms();
        return () => controller.abort();
    }, [filmStore.year, filmStore.genre, filmStore.rating]);


    if (films) {
        return (
            <div className={styles["films-container"]}>
                {films.map(film => (
                    <FilmCard key={film.id} film={film}/>
                ))}
            </div>
        );
    }
//ПОДУМАТЬ ПОЧЕМУ БЕЗ LENGTH ПОСЛЕ ФИЛЬМЫ НЕ НАЙДЕНЫ НЕ ПОКАЗЫВАЕТСЯ СКЕЛЕТОН
    if (filmStore.status === 'loading' && !filmStore.films?.length) {
        return (
            <div className={styles["films-container"]}>
                {Array.from({ length: 8 }).map((_, idx) => (
                    <FilmCardSkeleton key={idx} />
                ))}
            </div>
        )
    }

    if (filmStore.error) {
        return <InfoMessage color="red">{filmStore.error}</InfoMessage>;
    }


    if (!filmStore.films?.length) {
        return <InfoMessage color="neutral">Фильмы не найдены</InfoMessage>;
    }


    return (
        <InfiniteScroll
            dataLength={filmStore.films.length}
            next={() => {
                filmService.addFilms()
            }}
            hasMore={filmService.hasMorePages()}
            loader={
                <div className={styles["films-container"]}>
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <FilmCardSkeleton key={idx} />
                    ))}
                </div>
            }
            endMessage={<p>No more results</p>}
        >
            <div className={styles["films-container"]}>
                {filmStore.films.map((film) => (
                    <FilmCard key={film.id} film={film}/>
                ))}
            </div>
        </InfiniteScroll>
    );

})
