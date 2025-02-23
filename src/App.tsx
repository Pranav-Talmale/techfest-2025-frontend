import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";
import SidebarComponent from "@/components/Sidebar/SidebarComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SidebarComponent />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
