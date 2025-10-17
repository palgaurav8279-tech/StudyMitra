import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdPanel from "@/components/AdPanel";
import { useQuery } from "@tanstack/react-query";
import type { Chapter } from "@shared/schema";

export default function ChapterPage() {
  const [, params] = useRoute("/chapter/:id");
  const chapterId = params?.id || "";

  const { data: chapter, isLoading } = useQuery<Chapter>({
    queryKey: ["/api/chapters/" + chapterId],
  });

  const { data: allChapters } = useQuery<Chapter[]>({
    queryKey: ["/api/chapters"],
  });

  // Find previous and next chapters
  const currentIndex = allChapters?.findIndex((ch) => ch.id === chapterId) ?? -1;
  const prevChapter = currentIndex > 0 ? allChapters?.[currentIndex - 1] : null;
  const nextChapter = currentIndex >= 0 && currentIndex < (allChapters?.length ?? 0) - 1 ? allChapters?.[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
          <Link href="/classes">
            <Button>Back to Classes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-[70%]">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Link href={`/class/${chapter.classNumber}`}>
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-back-to-class">
                    <ChevronLeft className="w-4 h-4" />
                    Class {chapter.classNumber}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge data-testid={`badge-class-${chapter.classNumber}`}>Class {chapter.classNumber}</Badge>
                <Badge variant="outline" data-testid={`badge-subject-${chapter.subject}`}>{chapter.subject}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-chapter-title">
                {chapter.title}
              </h1>
            </div>

            {/* Chapter Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap font-light text-lg leading-relaxed" data-testid="text-chapter-content">
                    {chapter.content}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              {prevChapter ? (
                <Link href={`/chapter/${prevChapter.id}`}>
                  <Button variant="outline" className="gap-2" data-testid="button-prev-chapter">
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="font-medium truncate max-w-[200px]">{prevChapter.title}</div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}

              {nextChapter ? (
                <Link href={`/chapter/${nextChapter.id}`}>
                  <Button variant="outline" className="gap-2" data-testid="button-next-chapter">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="font-medium truncate max-w-[200px]">{nextChapter.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
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
