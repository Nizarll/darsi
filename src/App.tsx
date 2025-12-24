import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar1 } from "./components/navbar1";

// --- kimo's PAGES ---
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Lesson from "./pages/Lesson";
import Courses from "./pages/Courses";

// --- le petit ghali'S NEW PAGES ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar1 />
        {/* Main Content Container */}
        <div className="min-h-screen bg-background text-foreground">
          <div className="p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              
              {/* Dashboards */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              
              {/* Learning Pages */}
              <Route path="/lesson" element={<Lesson />} />
              <Route path="/course/:id" element={<CourseDetail />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App