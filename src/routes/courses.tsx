import { Hero } from "@/components/hero"
import { Navbar1 } from "@/components/navbar1"
import { type Course, courses } from "@/lib/course"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}>
            {course.level}
          </span>
          <span className="text-xs text-muted-foreground">
            {course.durationHours}h
          </span>
        </div>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {new Date(course.creationDate).toLocaleDateString()}
        </span>
        <Button>Voir le cours</Button>
      </CardFooter>
    </Card>
  )
}

  export default function Courses() {
  return (
    <section className="bg-background w-full px-20 py-4 w-full flex">
      <div className="prose dark:prose-invert max-w-none w-full">
        <h1>Cours</h1>
        <p>
          Une sélection de cours clairs et intuitifs,
          conçus pour faciliter l’apprentissage et
          permettre à chacun de progresser à son rythme.
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 space-x-4">
          {courses.map((course: Course) => (
            <div key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
