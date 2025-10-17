import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Users, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "Comprehensive notes and materials curated by experienced educators",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Structured content designed to help students achieve academic excellence",
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Created with students' learning needs and preferences in mind",
    },
    {
      icon: Heart,
      title: "Completely Free",
      description: "No hidden charges, no subscriptions - quality education for all",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
              About StudyMitra
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted companion in learning
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                StudyMitra is dedicated to providing free, high-quality educational resources to students in Classes 6 through 9. 
                We believe that every student deserves access to excellent learning materials, regardless of their economic background.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our platform offers comprehensive notes, detailed explanations, and interactive quizzes across all major subjects - 
                Science, Mathematics, English, and Social Science. We're committed to making learning engaging, accessible, and effective.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Join Thousands of Students</h2>
              <p className="text-muted-foreground text-lg">
                Start your learning journey with StudyMitra today. Explore our comprehensive resources, 
                take interactive quizzes, and grow smarter every day - all completely free!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
