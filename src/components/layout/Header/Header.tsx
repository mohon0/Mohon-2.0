import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="border-b container border-muted-foreground">
      <div className=" mx-auto flex justify-between items-center px-4 md:px-10 py-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold">Mohon</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Design
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Blood Bank
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Best Computer T.C.
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Login
          </Link>
        </nav>

        {/* Mobile Menu Icon for Smaller Screens */}
        <div className="md:hidden">
          <ModeToggle />
          <MobileMenu /> {/* Render the MobileMenu component here */}
        </div>

        {/* Call to Action & Social Media for Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {/* Call to Action Button */}
          <Link href="/">
            <Button className="px-6 py-1.5 h-full text-sm font-semibold">
              Apply Now
            </Button>
          </Link>

          {/* Social Icons & Mode Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <FaSquareFacebook
                size={20}
                className="hover:text-primary transition-colors"
              />
            </Link>
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <FaSquareXTwitter
                size={20}
                className="hover:text-primary transition-colors"
              />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
