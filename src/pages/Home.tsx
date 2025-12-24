import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 text-center space-y-6 bg-gradient-to-b from-background to-muted/50">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bienvenue sur Daarsi
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          La plateforme d'apprentissage collaborative pour étudiants et enseignants.
        </p>
        
        
      </section>
      
      <div className="flex flex-col md:flex-row justify-center gap-8 p-10 bg-background">
        
        {/* Student Card */}
        <div className="text-center space-y-4 p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-sm w-full">
          <h2 className="text-2xl font-bold">Pour les Étudiants</h2>
          <p className="text-muted-foreground">Suivez vos cours et progressez.</p>
          <Button className="w-full" onClick={() => navigate("/student")}>
            Espace Étudiant
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => navigate("/courses")}>
            Voir tous les Cours
          </Button>
        </div>

        {/* Teacher Card */}
        <div className="text-center space-y-4 p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-sm w-full">
          <h2 className="text-2xl font-bold">Pour les Enseignants</h2>
          <p className="text-muted-foreground">Créez et gérez vos contenus.</p>
          <Button className="w-full" variant="outline" onClick={() => navigate("/teacher")}>
            Espace Enseignant
          </Button>
        </div>

      </div>
    </div>
  )
}