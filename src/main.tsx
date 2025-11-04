import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import { About } from "./pages/About.tsx";
import { ResumeRoast } from "./pages/Resume_Roast.tsx";
import { Navbar } from "./components/navbar.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="ResumeRoast" element={<ResumeRoast />} />
    </Routes>
  </BrowserRouter>,
);



