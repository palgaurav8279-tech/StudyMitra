import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: October 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At StudyMitra, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
                  use, and safeguard your information when you use our educational platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>We collect minimal information to provide our services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Usage data: Pages visited, time spent, and interaction patterns to improve our content</li>
                    <li>Device information: Browser type and device type for optimization purposes</li>
                    <li>Admin credentials: For authorized content management (admin users only)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">No User Registration Required</h2>
                <p className="text-muted-foreground leading-relaxed">
                  StudyMitra does not require students to create accounts or provide personal information to access educational content. 
                  All learning materials, notes, and quizzes are freely accessible without registration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>We use collected information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Improve and optimize our educational content</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Maintain and secure our platform</li>
                    <li>Manage content through our admin panel</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, 
                  or destruction of information. However, no method of transmission over the internet is 100% secure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not share your information with third parties for marketing purposes. We may use analytics services 
                  to understand usage patterns, but these services are configured to respect user privacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform is designed for students aged 11-15 (Classes 6-9). We do not knowingly collect personal 
                  information from children. Our no-registration policy ensures minimal data collection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at 
                  <a href="mailto:privacy@studymitra.com" className="text-primary hover:underline ml-1">
                    privacy@studymitra.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
