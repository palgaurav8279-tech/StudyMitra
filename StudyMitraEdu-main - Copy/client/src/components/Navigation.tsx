import { Link, useLocation } from "wouter";
import { Search, Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/classes", label: "Classes" },
    { href: "/quizzes", label: "Quizzes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-primary backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-home">
            <GraduationCap className="w-8 h-8 text-white" />
            <span className="text-xl font-semibold text-white">StudyMitra</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-white hover:bg-white/20 ${
                    isActive(link.href) ? "bg-white/30" : ""
                  }`}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
              <Input
                type="search"
                placeholder="Search topics..."
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-md animate-slide-in border-t border-white/20">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
              <Input
                type="search"
                placeholder="Search topics..."
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-mobile"
              />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/20 ${
                    isActive(link.href) ? "bg-white/30" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
