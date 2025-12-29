import AdminGallery from './pages/AdminGallery';
import AdminOffers from './pages/AdminOffers';
import AdminProducts from './pages/AdminProducts';
import Home from './pages/Home';
import Offers from './pages/Offers';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminGallery": AdminGallery,
    "AdminOffers": AdminOffers,
    "AdminProducts": AdminProducts,
    "Home": Home,
    "Offers": Offers,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};