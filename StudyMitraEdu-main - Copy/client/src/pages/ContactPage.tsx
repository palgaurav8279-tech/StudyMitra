import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm">support@studymitra.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="text-muted-foreground text-sm">feedback@studymitra.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Help & Support</h3>
                <p className="text-muted-foreground text-sm">help@studymitra.com</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">For Students</h3>
                  <p className="text-muted-foreground">
                    Have questions about our content or need help with a topic? Reach out to us at 
                    <a href="mailto:support@studymitra.com" className="text-primary hover:underline ml-1">
                      support@studymitra.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">For Educators</h3>
                  <p className="text-muted-foreground">
                    Interested in contributing content or partnering with us? Contact us at 
                    <a href="mailto:partners@studymitra.com" className="text-primary hover:underline ml-1">
                      partners@studymitra.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground">
                    For all other questions and feedback, please email us at 
                    <a href="mailto:info@studymitra.com" className="text-primary hover:underline ml-1">
                      info@studymitra.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
