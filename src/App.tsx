import { Button } from "@/components/ui/button"
import { ThemeProvider, useTheme } from "./components/theme-provider"
import { Hero47 } from "./components/hero47"
import { Navbar1 } from "./components/navbar1"


function App() {
  const { setTheme } = useTheme()
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Navbar1/>
        <Hero47/>
      </div>
    </ThemeProvider>
  )
}

export default App
