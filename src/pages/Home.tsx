import { Button } from "@/components/ui/button"
import { Hero } from "@/components/hero47" // Make sure this path matches your folder structure
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-6 p-10 bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Pour les Étudiants</h2>
          <p className="text-muted-foreground">Suivez vos cours et progressez.</p>
          <Button size="lg" onClick={() => navigate("/student")}>
            Espace Étudiant
          </Button>
        </div>

        <div className="w-px bg-border mx-4"></div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Pour les Enseignants</h2>
          <p className="text-muted-foreground">Créez et gérez vos contenus.</p>
          <Button size="lg" variant="outline" onClick={() => navigate("/teacher")}>
            Espace Enseignant
          </Button>
        </div>
      </div>
    </div>
  )
}