import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Brain, CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"

interface Quiz {
  id: number;
  title: string;
  description: string;
  content: string;
  options: string[];
  valid_options: string[];
}

export default function QuizDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true)
        const response = await api<Quiz>(`/quizzes/${id}`)
        setQuiz(response)
      } catch(e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [id])

  const handleAnswerToggle = (option: string) => {
    setSelectedAnswers(prev =>
      prev.includes(option)
        ? prev.filter(a => a !== option)
        : [...prev, option]
    )
  }

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      toast.error("Please select at least one answer")
      return
    }

    if (!quiz) return

    // Check if selected answers match valid options exactly
    const sortedSelected = [...selectedAnswers].sort()
    const sortedValid = [...quiz.valid_options].sort()
    const correct = JSON.stringify(sortedSelected) === JSON.stringify(sortedValid)

    setIsCorrect(correct)
    setSubmitted(true)

    if (correct) {
      toast.success("Correct answer!")
    } else {
      toast.error("Incorrect answer. Try again!")
    }
  }

  const handleReset = () => {
    setSelectedAnswers([])
    setSubmitted(false)
    setIsCorrect(false)
  }

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-background">
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="p-8 min-h-screen bg-background">
        <Button
          variant="ghost"
          onClick={() => navigate("/quizzes")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        <div className="p-4 border border-destructive rounded-md bg-destructive/10">
          <p className="text-destructive">Error: {error || "Quiz not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen max-w-4xl mx-auto">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/quizzes")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="h-8 w-8" />
              {quiz.title}
            </h1>
            {quiz.description && (
              <p className="text-muted-foreground mt-2">{quiz.description}</p>
            )}
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {quiz.options.length} Options
          </Badge>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Question</CardTitle>
          <CardDescription className="text-lg mt-2">
            {quiz.content || "Answer the following question:"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {quiz.options.map((option, index) => {
              const isSelected = selectedAnswers.includes(option)
              const isValidAnswer = quiz.valid_options.includes(option)
              const showCorrect = submitted && isValidAnswer
              const showIncorrect = submitted && isSelected && !isValidAnswer

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 border rounded-lg p-4 transition-all ${
                    showCorrect
                      ? "border-green-500 bg-green-500/10"
                      : showIncorrect
                      ? "border-red-500 bg-red-500/10"
                      : isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${!submitted ? "cursor-pointer" : ""}`}
                  onClick={() => !submitted && handleAnswerToggle(option)}
                >
                  <Checkbox
                    id={`option-${index}`}
                    checked={isSelected}
                    disabled={submitted}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 text-base font-medium pointer-events-none"
                  >
                    {option}
                  </Label>
                  {showCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showIncorrect && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-4 pt-4">
            {!submitted ? (
              <Button
                onClick={handleSubmit}
                className="w-full gap-2"
                size="lg"
                disabled={selectedAnswers.length === 0}
              >
                <CheckCircle2 className="h-5 w-5" />
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                Try Again
              </Button>
            )}
          </div>

          {submitted && (
            <div
              className={`p-4 rounded-lg border ${
                isCorrect
                  ? "border-green-500 bg-green-500/10"
                  : "border-red-500 bg-red-500/10"
              }`}
            >
              <p className={`font-semibold ${isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                {isCorrect
                  ? "Congratulations! You got it right!"
                  : `Incorrect. The correct answer${quiz.valid_options.length > 1 ? "s are" : " is"}: ${quiz.valid_options.join(", ")}`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
