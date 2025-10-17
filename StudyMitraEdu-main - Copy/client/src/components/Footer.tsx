import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/admin/login", label: "Admin Login" },
  ];

  return (
    <footer className="bg-card border-t border-card-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © {currentYear} StudyMitra. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
