import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beaker, Calculator, BookOpen, Globe, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdPanel from "@/components/AdPanel";
import { useQuery } from "@tanstack/react-query";
import type { Chapter } from "@shared/schema";

export default function ClassPage() {
  const [, params] = useRoute("/class/:classNumber");
  const classNumber = parseInt(params?.classNumber || "6");

  const { data: allChapters, isLoading } = useQuery<Chapter[]>({
    queryKey: ["/api/chapters"],
  });

  const chapters = allChapters?.filter((ch) => ch.classNumber === classNumber);

  const subjects = [
    { name: "Science", icon: Beaker, color: "from-green-500 to-emerald-500" },
    { name: "Math", icon: Calculator, color: "from-blue-500 to-cyan-500" },
    { name: "English", icon: BookOpen, color: "from-purple-500 to-pink-500" },
    { name: "Social Science", icon: Globe, color: "from-orange-500 to-red-500" },
  ];

  const getSubjectChapters = (subjectName: string) => {
    return chapters?.filter((ch) => ch.subject === subjectName) || [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-[70%]">
            {/* Header */}
            <div className="mb-8">
              <Badge className="mb-4" data-testid={`badge-class-${classNumber}`}>Class {classNumber}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-page-title">
                Class {classNumber} - All Subjects
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose a subject to explore chapters and start learning
              </p>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const subjectChapters = getSubjectChapters(subject.name);

                return (
                  <Card 
                    key={subject.name}
                    className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    data-testid={`card-subject-${subject.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isLoading ? "Loading..." : `${subjectChapters.length} chapters`}
                          </p>
                        </div>
                      </div>

                      {/* Chapter List Preview */}
                      {!isLoading && subjectChapters.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {subjectChapters.slice(0, 3).map((chapter) => (
                            <Link key={chapter.id} href={`/chapter/${chapter.id}`}>
                              <div 
                                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group/item"
                                data-testid={`link-chapter-${chapter.id}`}
                              >
                                <span className="text-sm font-medium truncate flex-1">
                                  {chapter.title}
                                </span>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                              </div>
                            </Link>
                          ))}
                          {subjectChapters.length > 3 && (
                            <p className="text-xs text-muted-foreground pl-2">
                              +{subjectChapters.length - 3} more chapters
                            </p>
                          )}
                        </div>
                      )}

                      {!isLoading && subjectChapters.length === 0 && (
                        <p className="text-sm text-muted-foreground">No chapters available yet</p>
                      )}

                      {isLoading && (
                        <div className="space-y-2">
                          <div className="h-8 bg-muted rounded animate-pulse"></div>
                          <div className="h-8 bg-muted rounded animate-pulse"></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Ad Panel */}
          <AdPanel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
