import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pencil, Trash2, BookOpen, ListChecks, FileText } from "lucide-react"
import { api } from "@/lib/api"
import { toast } from "sonner"

interface Course {
  id: number
  title: string
  description: string
  content: string
}

interface Chapter {
  id: number
  course_id: number
  title: string
  description: string
  content: string
}

interface Quiz {
  id: number
  title: string
  description: string
  content: string
  options: string[]
  valid_options: string[]
}

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [courseDialogOpen, setCourseDialogOpen] = useState(false)
  const [chapterDialogOpen, setChapterDialogOpen] = useState(false)
  const [courseChaptersDialogOpen, setCourseChaptersDialogOpen] = useState(false)
  const [quizDialogOpen, setQuizDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedCourseChapters, setSelectedCourseChapters] = useState<Chapter[]>([])

  // Form states
  const [courseForm, setCourseForm] = useState({ title: "", description: "", content: "" })
  const [chapterForm, setChapterForm] = useState({ title: "", description: "", content: "" })
  const [quizForm, setQuizForm] = useState({ title: "", description: "", content: "", options: "", valid_options: "" })

  useEffect(() => {
    fetchCourses()
    fetchChapters()
    fetchQuizzes()
  }, [])

  const fetchCourses = async () => {
    try {
      const data = await api<{ courses: Course[] }>("/courses")
      setCourses(data.courses)
    } catch (error) {
      toast.error("Erreur lors du chargement des cours")
    }
  }

  const fetchChapters = async () => {
    try {
      const allChapters: Chapter[] = []
      for (const course of courses) {
        const data = await api<{ chapters: Chapter[] }>(`/courses/${course.id}/chapters`)
        allChapters.push(...data.chapters)
      }
      setChapters(allChapters)
    } catch (error) {
      toast.error("Erreur lors du chargement des chapitres")
    }
  }

  const fetchQuizzes = async () => {
    try {
      const data = await api<{ quizzes: Quiz[] }>("/quizzes")
      setQuizzes(data.quizzes)
    } catch (error) {
      toast.error("Erreur lors du chargement des quiz")
    }
  }

  // Course handlers
  const handleCreateCourse = async () => {
    try {
      await api("/courses", {
        method: "POST",
        body: JSON.stringify(courseForm),
      })
      toast.success("Cours créé avec succès!")
      setCourseDialogOpen(false)
      setCourseForm({ title: "", description: "", content: "" })
      fetchCourses()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUpdateCourse = async () => {
    if (!editingCourse) return
    try {
      await api(`/courses/${editingCourse.id}`, {
        method: "PUT",
        body: JSON.stringify(courseForm),
      })
      toast.success("Cours mis à jour!")
      setCourseDialogOpen(false)
      setEditingCourse(null)
      setCourseForm({ title: "", description: "", content: "" })
      fetchCourses()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDeleteCourse = async (id: number) => {
    try {
      await api(`/courses/${id}`, { method: "DELETE" })
      toast.success("Cours supprimé!")
      fetchCourses()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const openCourseDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course)
      setCourseForm({ title: course.title, description: course.description, content: course.content })
    } else {
      setEditingCourse(null)
      setCourseForm({ title: "", description: "", content: "" })
    }
    setCourseDialogOpen(true)
  }

  // Open course chapters dialog
  const openCourseChaptersDialog = async (course: Course) => {
    setSelectedCourse(course)
    try {
      const data = await api<{ chapters: Chapter[] }>(`/courses/${course.id}/chapters`)
      setSelectedCourseChapters(data.chapters)
      setCourseChaptersDialogOpen(true)
    } catch (error) {
      toast.error("Erreur lors du chargement des chapitres")
    }
  }

  // Chapter handlers
  const handleCreateChapter = async () => {
    if (!selectedCourse) return
    try {
      await api("/chapters", {
        method: "POST",
        body: JSON.stringify({ ...chapterForm, course_id: selectedCourse.id }),
      })
      toast.success("Chapitre créé avec succès!")
      setChapterDialogOpen(false)
      setChapterForm({ title: "", description: "", content: "" })
      openCourseChaptersDialog(selectedCourse)
      fetchChapters()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUpdateChapter = async () => {
    if (!editingChapter || !selectedCourse) return
    try {
      await api(`/chapters/${editingChapter.id}`, {
        method: "PUT",
        body: JSON.stringify({ title: chapterForm.title, description: chapterForm.description, content: chapterForm.content }),
      })
      toast.success("Chapitre mis à jour!")
      setChapterDialogOpen(false)
      setEditingChapter(null)
      setChapterForm({ title: "", description: "", content: "" })
      openCourseChaptersDialog(selectedCourse)
      fetchChapters()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDeleteChapter = async (id: number) => {
    if (!selectedCourse) return
    try {
      await api(`/chapters/${id}`, { method: "DELETE" })
      toast.success("Chapitre supprimé!")
      openCourseChaptersDialog(selectedCourse)
      fetchChapters()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const openChapterDialog = (chapter?: Chapter) => {
    if (chapter) {
      setEditingChapter(chapter)
      setChapterForm({ title: chapter.title, description: chapter.description, content: chapter.content })
    } else {
      setEditingChapter(null)
      setChapterForm({ title: "", description: "", content: "" })
    }
    setChapterDialogOpen(true)
  }

  // Quiz handlers
  const handleCreateQuiz = async () => {
    try {
      await api("/quizzes", {
        method: "POST",
        body: JSON.stringify({
          title: quizForm.title,
          description: quizForm.description,
          content: quizForm.content,
          options: quizForm.options.split(",").map(o => o.trim()),
          valid_options: quizForm.valid_options.split(",").map(o => o.trim()),
        }),
      })
      toast.success("Quiz créé avec succès!")
      setQuizDialogOpen(false)
      setQuizForm({ title: "", description: "", content: "", options: "", valid_options: "" })
      fetchQuizzes()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUpdateQuiz = async () => {
    if (!editingQuiz) return
    try {
      await api(`/quizzes/${editingQuiz.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: quizForm.title,
          description: quizForm.description,
          content: quizForm.content,
          options: quizForm.options.split(",").map(o => o.trim()),
          valid_options: quizForm.valid_options.split(",").map(o => o.trim()),
        }),
      })
      toast.success("Quiz mis à jour!")
      setQuizDialogOpen(false)
      setEditingQuiz(null)
      setQuizForm({ title: "", description: "", content: "", options: "", valid_options: "" })
      fetchQuizzes()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDeleteQuiz = async (id: number) => {
    try {
      await api(`/quizzes/${id}`, { method: "DELETE" })
      toast.success("Quiz supprimé!")
      fetchQuizzes()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const openQuizDialog = (quiz?: Quiz) => {
    if (quiz) {
      setEditingQuiz(quiz)
      setQuizForm({
        title: quiz.title,
        description: quiz.description,
        content: quiz.content,
        options: quiz.options.join(", "),
        valid_options: quiz.valid_options.join(", "),
      })
    } else {
      setEditingQuiz(null)
      setQuizForm({ title: "", description: "", content: "", options: "", valid_options: "" })
    }
    setQuizDialogOpen(true)
  }

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Espace Enseignant</h1>
          <p className="text-muted-foreground">Gérez vos cours et quiz. Ajoutez des chapitres depuis chaque cours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cours</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chapitres</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chapters.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quiz</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizzes.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openCourseDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Nouveau Cours
            </Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableCaption>Liste de vos cours créés.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Chapitres</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{chapters.filter(c => c.course_id === course.id).length}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openCourseChaptersDialog(course)}>
                        <FileText className="mr-1 h-4 w-4" /> Chapitres
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openCourseDialog(course)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteCourse(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openQuizDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Nouveau Quiz
            </Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableCaption>Liste de vos quiz créés.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.description}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openQuizDialog(quiz)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteQuiz(quiz.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Dialog */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Modifier le cours" : "Nouveau cours"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="course-title">Titre</Label>
              <Input
                id="course-title"
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="course-content">Contenu</Label>
              <Textarea
                id="course-content"
                value={courseForm.content}
                onChange={(e) => setCourseForm({ ...courseForm, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseDialogOpen(false)}>Annuler</Button>
            <Button onClick={editingCourse ? handleUpdateCourse : handleCreateCourse}>
              {editingCourse ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Chapters Dialog */}
      <Dialog open={courseChaptersDialogOpen} onOpenChange={setCourseChaptersDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chapitres - {selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => openChapterDialog()}>
                <Plus className="mr-2 h-4 w-4" /> Nouveau Chapitre
              </Button>
            </div>
            {selectedCourseChapters.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Aucun chapitre pour ce cours</p>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCourseChapters.map((chapter) => (
                      <TableRow key={chapter.id}>
                        <TableCell className="font-medium">{chapter.title}</TableCell>
                        <TableCell>{chapter.description}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openChapterDialog(chapter)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteChapter(chapter.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Chapter Dialog */}
      <Dialog open={chapterDialogOpen} onOpenChange={setChapterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingChapter ? "Modifier le chapitre" : "Nouveau chapitre"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="chapter-title">Titre</Label>
              <Input
                id="chapter-title"
                value={chapterForm.title}
                onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="chapter-description">Description</Label>
              <Textarea
                id="chapter-description"
                value={chapterForm.description}
                onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="chapter-content">Contenu</Label>
              <Textarea
                id="chapter-content"
                value={chapterForm.content}
                onChange={(e) => setChapterForm({ ...chapterForm, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChapterDialogOpen(false)}>Annuler</Button>
            <Button onClick={editingChapter ? handleUpdateChapter : handleCreateChapter}>
              {editingChapter ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingQuiz ? "Modifier le quiz" : "Nouveau quiz"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quiz-title">Titre</Label>
              <Input
                id="quiz-title"
                value={quizForm.title}
                onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quiz-description">Description</Label>
              <Textarea
                id="quiz-description"
                value={quizForm.description}
                onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quiz-content">Contenu</Label>
              <Textarea
                id="quiz-content"
                value={quizForm.content}
                onChange={(e) => setQuizForm({ ...quizForm, content: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quiz-options">Options (séparées par des virgules)</Label>
              <Input
                id="quiz-options"
                placeholder="Option 1, Option 2, Option 3"
                value={quizForm.options}
                onChange={(e) => setQuizForm({ ...quizForm, options: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quiz-valid">Réponses valides (séparées par des virgules)</Label>
              <Input
                id="quiz-valid"
                placeholder="Option 1, Option 2"
                value={quizForm.valid_options}
                onChange={(e) => setQuizForm({ ...quizForm, valid_options: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuizDialogOpen(false)}>Annuler</Button>
            <Button onClick={editingQuiz ? handleUpdateQuiz : handleCreateQuiz}>
              {editingQuiz ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
