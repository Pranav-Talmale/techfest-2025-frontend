import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import ErrorPage from "@/pages/ErrorPage";
import SidebarComponent from "@/components/Sidebar/SidebarComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SidebarComponent />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/detail" element={<EventDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
