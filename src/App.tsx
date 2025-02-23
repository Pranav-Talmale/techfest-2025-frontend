import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import ErrorPage from "@/pages/ErrorPage";
import Navbar from "@/components/Navbar";

// Placeholder component for Contact
const Contact = () => (
  <div className="min-h-screen bg-black pt-16">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold text-white mb-8">Contact Us</h1>
      <p className="text-white/70">Coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/detail" element={<EventDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
