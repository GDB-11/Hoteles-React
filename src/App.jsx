import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import NavBar from './components/shared/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<div><h1>404</h1><p>Page not found!</p></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
