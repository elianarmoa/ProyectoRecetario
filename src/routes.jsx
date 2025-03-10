import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MealDetail from "./pages/MealDetail";

export default function AppRoutes() {
return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/meal/:id" element={<MealDetail />} />
    </Routes>
    </BrowserRouter>
);
}
