import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import ClassesPage from "@/pages/ClassesPage";
import ClassPage from "@/pages/ClassPage";
import ChapterPage from "@/pages/ChapterPage";
import QuizzesPage from "@/pages/QuizzesPage";
import QuizPage from "@/pages/QuizPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/classes" component={ClassesPage} />
      <Route path="/class/:classNumber" component={ClassPage} />
      <Route path="/chapter/:id" component={ChapterPage} />
      <Route path="/quizzes" component={QuizzesPage} />
      <Route path="/quiz/:id" component={QuizPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
