import {Films} from "../../widgets/films";
import {Header} from "../../widgets/header";
import {SortForm} from "../../features/sort";

export const MainPage = () => {
    return (
        <>
            <Header />
            <main>
                <SortForm />
                <Films/>
            </main>
        </>
    )
}
