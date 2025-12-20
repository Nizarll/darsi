import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar1 } from "./components/navbar1";

import Home from "./pages/Home"; // <--- Import the new Home page
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar1 />
        <div className="p-4">
          <Routes>
            {/* The root path "/" now shows the Home page */}
            <Route path="/" element={<Home />} />
            
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/lesson" element={<Lesson />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App