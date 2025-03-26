import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { Leadership } from "./components/Leadership/Leadership";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import LoadingScreen from "./components/LoadingScreen";
import AboutUs from "./pages/AboutUs";
import { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const location = useLocation();

  useEffect(() => {
        window.scrollTo({
        top: 0,
        left: 0,
      });

  }, [location.pathname]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-black text-white">
        <LoadingScreen />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/events/detail" element={<EventDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
