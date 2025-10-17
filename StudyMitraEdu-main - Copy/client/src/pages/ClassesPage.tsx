import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ClassesPage() {
  const classes = [
    { number: 6, color: "from-blue-500 to-cyan-500", description: "Foundation year with core subjects" },
    { number: 7, color: "from-indigo-500 to-blue-500", description: "Building on fundamentals" },
    { number: 8, color: "from-purple-500 to-indigo-500", description: "Advanced concepts and applications" },
    { number: 9, color: "from-pink-500 to-purple-500", description: "Preparation for board exams" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-page-title">
            All Classes
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your class to explore subjects, chapters, and learning materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((classItem) => (
            <Link key={classItem.number} href={`/class/${classItem.number}`}>
              <Card 
                className="group cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-2 border-2 hover:border-primary overflow-hidden h-full"
                data-testid={`card-class-${classItem.number}`}
              >
                <CardContent className="p-6">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-4xl font-bold text-white">{classItem.number}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-3">Class {classItem.number}</h3>
                  <p className="text-center text-muted-foreground">
                    {classItem.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
