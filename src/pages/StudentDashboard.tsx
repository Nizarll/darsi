import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import type { Course } from "@/lib/course"

interface UserCourse {
  user_id: number;
  course_id: number;
};

export default function StudentDashboard() {
  const navigate = useNavigate()

  const [myCourses, setMyCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await api<{ courses: Course[] }>(`/courses/`)
        const res2 = await api<{ data: UserCourse[] }>(`/user_courses/`)

        setAllCourses(res1.courses)

        const enrolledCourses = res1.courses.filter((course: Course) =>
          res2.data.some((uc) => Number(uc.course_id) === Number(course.id))
        ).map((course: Course) => ({
          ...course,
          progress: (course as any).progress || 0,
          totalLessons: (course as any).totalLessons || 0,
          completedLessons: (course as any).completedLessons || 0,
        }))

        setMyCourses(enrolledCourses)
      } catch(e: any) {
        setError(e.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Mon Apprentissage</h1>
        <p className="text-muted-foreground">Retrouvez vos cours et votre progression.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => {
          const progress = (course as any).progress || 0
          const totalLessons = (course as any).totalLessons || 0
          const completedLessons = (course as any).completedLessons || 0

          return (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  {progress === 0 ? (
                    <Badge variant="outline">Non commencé</Badge>
                  ) : (
                    <Badge variant="secondary">En cours</Badge>
                  )}
                </div>
                <CardDescription>
                  {completedLessons} / {totalLessons} leçons terminées
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={() => navigate(`/course/${course.id}`)}>
                  <BookOpen className="h-4 w-4" />
                  {progress === 0 ? "Commencer" : "Continuer"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
