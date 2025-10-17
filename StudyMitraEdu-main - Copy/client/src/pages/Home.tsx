import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdPanel from "@/components/AdPanel";
import { useQuery } from "@tanstack/react-query";
import type { Chapter } from "@shared/schema";

export default function Home() {
  const { data: recentChapters, isLoading } = useQuery<Chapter[]>({
    queryKey: ["/api/chapters/recent"],
  });

  const classes = [
    { number: 6, color: "from-blue-500 to-cyan-500" },
    { number: 7, color: "from-indigo-500 to-blue-500" },
    { number: 8, color: "from-purple-500 to-indigo-500" },
    { number: 9, color: "from-pink-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg" data-testid="text-hero-title">
              Learn Smart, Grow Smarter
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Free educational notes, explanations, and interactive quizzes for students in Classes 6 to 9. 
              Master Science, Math, English, and Social Science with ease.
            </p>
            <Link href="/classes">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all px-8 py-6 text-lg font-medium shadow-xl"
                data-testid="button-start-learning"
              >
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content with Ad Panel */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-[70%]">
            {/* Classes Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-section-classes">
                Choose Your Class
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {classes.map((classItem) => (
                  <Link key={classItem.number} href={`/class/${classItem.number}`}>
                    <Card 
                      className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-primary overflow-hidden"
                      data-testid={`card-class-${classItem.number}`}
                    >
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${classItem.color} flex items-center justify-center`}>
                          <span className="text-3xl font-bold text-white">{classItem.number}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-center">Class {classItem.number}</h3>
                        <p className="text-center text-muted-foreground mt-2">
                          Explore subjects & chapters
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular/Recently Updated Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-semibold" data-testid="text-section-recent">
                  Recently Updated
                </h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentChapters?.slice(0, 4).map((chapter) => (
                    <Link key={chapter.id} href={`/chapter/${chapter.id}`}>
                      <Card 
                        className="group cursor-pointer hover:shadow-md transition-all hover-elevate"
                        data-testid={`card-chapter-${chapter.id}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant="secondary" data-testid={`badge-class-${chapter.classNumber}`}>
                              Class {chapter.classNumber}
                            </Badge>
                            <Badge variant="outline" data-testid={`badge-subject-${chapter.subject}`}>
                              {chapter.subject}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors" data-testid={`text-chapter-title-${chapter.id}`}>
                            {chapter.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Updated {new Date(chapter.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Quiz Section Preview */}
            <section className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-semibold" data-testid="text-section-quizzes">
                  Featured Quizzes
                </h2>
              </div>
              <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Test Your Knowledge</h3>
                  <p className="text-muted-foreground mb-6">
                    Take interactive quizzes to reinforce your learning and track your progress.
                  </p>
                  <Link href="/quizzes">
                    <Button data-testid="button-view-quizzes">
                      View All Quizzes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Ad Panel */}
          <AdPanel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
