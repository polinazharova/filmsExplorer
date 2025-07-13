import {observer} from "mobx-react-lite";
import {FilmDetails, FilmDetailsSkeleton, filmService, filmStore} from "@/entities/film";
import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import {BackButton} from "@/shared/back-button/ui/BackButton";
import {Header} from "@/widgets/header/ui/Header";
import {InfoMessage} from "@/shared/info-message";

const FilmPage = observer(() => {
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            filmService.getFilm(+id);
        }
    }, [])

    if (filmStore.status === 'loading') {
        return (
            <>
                <Header/>
                <main>
                    <BackButton/>
                    <FilmDetailsSkeleton />;
                </main>
            </>
            )
    }

    if (filmStore.error) {
        return (
            <>
                <Header/>
                <main>
                    <BackButton/>
                    <InfoMessage color="red">{filmStore.error}</InfoMessage>;
                </main>
            </>
        )
    }

    if (!filmStore.film) {
        return (
            <>
                <Header/>
                <main>
                    <BackButton/>
                    <InfoMessage color="neutral">Фильм не найден</InfoMessage>;
                </main>
            </>
        )
    }

    return (
        <>
            <Header/>
            <main>
                <BackButton/>
                <FilmDetails film={filmStore.film}/>
            </main>
        </>
    )
})

export default FilmPage;
