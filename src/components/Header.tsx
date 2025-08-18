import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="backdrop-blur-md bg-white/40 border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* Logo Placeholder */}
            <div className="mr-3 flex items-center">
              <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                <img
                  src="/agrilink-logo.png"
                  alt="Agrilink Logo"
                  className="w-6 h-6 object-contain"
                />
              </span>
            </div>
            <span 
              className="text-primary"
              style={{
                fontFamily: 'Montserrat, MadaniArabic-Bold, sans-serif',
                fontWeight: 700,
                fontSize: '25.95px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              agrilink
            </span>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
                style={{
                  fontFamily: 'Montserrat, MadaniArabic-Bold, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <Button 
              className="bg-primary text-primary-foreground transition-colors duration-200"
              style={{ 
                '--hover-bg': 'var(--brand-colors-SoilBlush, rgba(211, 171, 158, 1))' 
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--brand-colors-SoilBlush, rgba(211, 171, 158, 1))';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '';
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors"
                    style={{
                      fontFamily: 'Montserrat, MadaniArabic-Bold, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="bg-primary text-primary-foreground mt-4 transition-colors duration-200"
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--brand-colors-SoilBlush, rgba(211, 171, 158, 1))';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '';
                  }}
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;