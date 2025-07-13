import './App.scss'
import {MainPage} from "../pages/main-page/MainPage.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmPage from "../pages/film-page/FilmPage.tsx";
import FavoriteFilmsPage from "../pages/favorite-films/FavoriteFilmsPage.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/film/:id" element={<FilmPage />} />
                <Route path="/favorite" element={<FavoriteFilmsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
