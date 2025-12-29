import Home from './pages/Home';
import AdminGallery from './pages/AdminGallery';
import AdminOffers from './pages/AdminOffers';
import Offers from './pages/Offers';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "AdminGallery": AdminGallery,
    "AdminOffers": AdminOffers,
    "Offers": Offers,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};