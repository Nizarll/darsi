import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Trophy } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

interface Quiz {
  id: number;
  title: string;
  description: string;
  content: string;
  options: string[];
  valid_options: string[];
}

export default function Quizzes() {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const response = await api<{ quizzes: Quiz[] }>(`/quizzes`)
        setQuizzes(response.quizzes)
      } catch(e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and track your progress.</p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading quizzes...</p>
        </div>
      )}

      {error && (
        <div className="p-4 border border-destructive rounded-md bg-destructive/10">
          <p className="text-destructive">Error: {error}</p>
        </div>
      )}

      {!loading && !error && quizzes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Brain className="h-16 w-16 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">No quizzes available yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  {quiz.title}
                </CardTitle>
                <Badge variant="secondary">
                  {quiz.options.length} Questions
                </Badge>
              </div>
              <CardDescription className="mt-2">
                {quiz.description || "Test your knowledge with this quiz."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>~{quiz.options.length * 2} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  <span>{quiz.valid_options.length} correct answers needed</span>
                </div>
              </div>
              <Button
                className="w-full gap-2"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                <Brain className="h-4 w-4" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
