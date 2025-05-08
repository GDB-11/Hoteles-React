import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import Contact from "./pages/contact/Contact";
import Offers from "./pages/offers/Offers";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-amber-50">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contact />}/>
            <Route path="/promociones" element={<Offers />}/>
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

export default App;
