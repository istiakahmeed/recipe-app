import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
