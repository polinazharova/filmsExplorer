import {BackButton} from "@/shared/back-button/ui/BackButton.tsx";
import {useEffect} from "react";
import {filmService, filmStore} from "@/entities/film";
import {Films} from "@/widgets/films";
import {observer} from "mobx-react-lite";
import {InfoMessage} from "@/shared/info-message";
import {Header} from "@/widgets/header";

const FavoriteFilmsPage = observer(() => {
    useEffect(() => {
        if (filmStore.favoriteFilms) {
            return;
        }
        const favoriteFilms = filmService.getFavoriteFilms();

        if (favoriteFilms) {
            filmService.setFavoriteFilms(favoriteFilms);
        }
    }, [])

    if (!filmStore.favoriteFilms?.length) {
        return (
            <>
                <Header/>
                <main>
                    <BackButton/>
                    <InfoMessage color="neutral">Избранных фильмов еще нет :(</InfoMessage>
                </main>
            </>
        )
    }

    return (
        <>
            <Header/>
            <main>
                <BackButton/>
                <Films films={filmStore.favoriteFilms}/>
            </main>
        </>
    )
})

export default FavoriteFilmsPage;
