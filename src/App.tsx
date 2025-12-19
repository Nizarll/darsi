import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from "./components/theme-provider"
import { Hero } from "./components/hero"
import { Navbar1 } from "./components/navbar1"
import Index from './routes';
import Courses from './routes/courses';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex min-h-svh flex-col items-center">
          <div className="flex w-full lg:justify-center justify-end px-8 py-2 lg:px-0 lg:py-0">
            <Navbar1/>
          </div>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/courses' element={<Courses />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
