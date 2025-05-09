import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { ApiProvider, useHotelData, useSedeData } from "./contexts/ApiContext";
import Home from "./pages/home/Home";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import Contact from "./pages/contact/Contact";
import Offers from "./pages/offers/Offers";
import RoomDetail from "./pages/room/RoomDetail";

// Componente que maneja la carga inicial de datos
function DataInitializer({ children }) {
  const { fetchData: fetchHotelData } = useHotelData();
  const { fetchData: fetchSedeData } = useSedeData();
  
  useEffect(() => {
    // Cargar datos al inicio de la aplicación
    fetchHotelData();
    fetchSedeData();
  }, []);
  
  return children;
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-amber-50">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/promociones" element={<Offers />} />
            <Route path="/habitacion/:id" element={<RoomDetail />} />
            <Route
              path="*"
              element={
                <div>
                  <h1>404</h1>
                  <p>Page not found!</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ApiProvider>
      <DataInitializer>
        <AppContent />
      </DataInitializer>
    </ApiProvider>
  );
}

export default App;