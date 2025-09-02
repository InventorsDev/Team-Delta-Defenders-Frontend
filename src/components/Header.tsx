import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'border-b border-transparent shadow-none'
      }`}
      style={{ 
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'var(--brand-colors-HarvestMist, rgba(228, 253, 225, 1))'
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/Agrilink-logo-dark.svg"
              alt="Agrilink Logo"
              className="h-10 w-auto object-contain ml-4"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors"
                style={{
                  color: 'var(--brand-colors-RootBlack, hsla(86, 78%, 8%, 1))',
                  fontFamily: 'MadaniArabic-Bold',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px',
                  leadingTrim: 'cap-height',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-[hsl(var(--brand-colors-SoilBlush))] transition-colors duration-200"
                style={{ 
                  fontFamily: 'MadaniArabic-Bold',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px',
                  leadingTrim: 'cap-height',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  width: '160px',
                  height: '40px',
                  minWidth: '160px',
                  minHeight: '40px',
                  borderRadius: '30px',
                  paddingTop: '12px',
                  paddingRight: '24px',
                  paddingBottom: '12px',
                  paddingLeft: '24px',
                  gap: '10px',
                  transform: 'rotate(0deg)',
                  opacity: 1
                } as React.CSSProperties}
              >
                Log In
              </Button>
            </Link>
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
                    className="text-foreground hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors"
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
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-[hsl(var(--brand-colors-SoilBlush))] mt-4 transition-colors duration-200"
                    style={{
                      fontFamily: 'MadaniArabic-Bold',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      leadingTrim: 'cap-height',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      width: '160px',
                      height: '40px',
                      minWidth: '160px',
                      minHeight: '40px',
                      borderRadius: '30px',
                      paddingTop: '12px',
                      paddingRight: '24px',
                      paddingBottom: '12px',
                      paddingLeft: '24px',
                      gap: '10px',
                      transform: 'rotate(0deg)',
                      opacity: 1
                    }}
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;