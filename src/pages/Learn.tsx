import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, BookOpen, Play, CheckCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { api } from "@/lib/api"

interface Lesson {
  id: number;
  course_id: number;
  title: string;
  description: string;
  video_url?: string;
  content?: string;
  order_index?: number;
}

interface Chapter {
  id: number;
  course_id: number;
  title: string;
  description: string;
  content: string;
}

interface CourseData {
  id: number;
  title: string;
  description: string;
  content: string;
  created_at: string;
  chapters: Chapter[];
  lessons: Lesson[];
}

// Helper function to parse video URL from content string
function parseVideoFromContent(content: string): string | null {
  if (!content) return null;

  // Match patterns like [VIDEO:url] or {VIDEO:url} or VIDEO:url
  const patterns = [
    /\[VIDEO:(.*?)\]/i,
    /\{VIDEO:(.*?)\}/i,
    /VIDEO:\s*(https?:\/\/[^\s]+)/i,
    /(https?:\/\/(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/|vimeo\.com\/)[^\s]+)/i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
}

// Helper function to clean content by removing video markers
function cleanContent(content: string): string {
  if (!content) return '';

  return content
    .replace(/\[VIDEO:.*?\]/gi, '')
    .replace(/\{VIDEO:.*?\}/gi, '')
    .replace(/VIDEO:\s*https?:\/\/[^\s]+/gi, '')
    .trim();
}

export default function Learn() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)

        // First, try to fetch as a lesson ID
        try {
          const lessonResponse = await api<Lesson>(`/lessons/${id}`)

          // If we got a lesson, fetch its course
          const courseResponse = await api<CourseData>(`/courses/${lessonResponse.course_id}`)
          setCourse(courseResponse)

          // Set current lesson index based on the lesson we fetched
          const lessonIndex = courseResponse.lessons?.findIndex(l => l.id === lessonResponse.id) ?? 0
          setCurrentLessonIndex(lessonIndex >= 0 ? lessonIndex : 0)

          // Prefetch video if available
          if (lessonResponse.video_url) {
            prefetchVideo(lessonResponse.video_url)
          }
        } catch (lessonError) {
          // If fetching as lesson fails, try as course ID
          const courseResponse = await api<CourseData>(`/courses/${id}`)
          setCourse(courseResponse)

          // Prefetch video if available
          if (courseResponse.lessons && courseResponse.lessons.length > 0) {
            prefetchVideo(courseResponse.lessons[0].video_url)
          }
        }
      } catch (e: any) {
        setError(e.message || "Failed to load course")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourseData()
    }
  }, [id])

  // Prefetch the next video for smoother transitions
  const prefetchVideo = (videoUrl?: string) => {
    if (!videoUrl) return;

    // For YouTube videos, we can prefetch by creating a hidden link
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = videoUrl;
    link.as = 'document';
    document.head.appendChild(link);
  }

  // Handle lesson navigation
  const handleLessonChange = (index: number) => {
    // Navigate to the lesson's URL
    if (course?.lessons && course.lessons[index]) {
      navigate(`/learn/${course.lessons[index].id}`)
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <p>Loading course...</p>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <p className="text-red-500">Error: {error || "Course not found"}</p>
        <Button onClick={() => navigate("/courses")}>Return to Courses</Button>
      </div>
    )
  }

  const currentLesson = course.lessons?.[currentLessonIndex]
  const videoUrl = currentLesson?.video_url || parseVideoFromContent(course.content)

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/courses")}
          className="pl-0 hover:pl-2 transition-all"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
        <Badge variant="secondary" className="text-sm">
          {course.lessons?.length || 0} Lessons
        </Badge>
      </div>

      {/* Course Title */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-muted-foreground text-lg">{course.description}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Video and Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Section */}
          {videoUrl && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                ref={videoRef}
                width="100%"
                height="100%"
                src={videoUrl}
                title="Course video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Lesson/Course Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {currentLesson ? currentLesson.title : course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>{currentLesson ? currentLesson.description : course.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Materials</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  {currentLesson?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: cleanContent(currentLesson.content) }} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: cleanContent(course.content) }} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Lessons List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {course.lessons && course.lessons.length > 0 ? (
                course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonChange(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all hover:bg-accent ${
                      currentLessonIndex === index ? 'bg-accent border-2 border-primary' : 'border border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${currentLessonIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>
                        {currentLessonIndex > index ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          Lesson {lesson.order_index || index + 1}
                        </p>
                        <p className={`text-sm ${
                          currentLessonIndex === index ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {lesson.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No lessons available yet</p>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {course.lessons && course.lessons.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={currentLessonIndex === 0}
                onClick={() => handleLessonChange(currentLessonIndex - 1)}
              >
                Previous
              </Button>
              <Button
                className="flex-1"
                disabled={currentLessonIndex === course.lessons.length - 1}
                onClick={() => handleLessonChange(currentLessonIndex + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
