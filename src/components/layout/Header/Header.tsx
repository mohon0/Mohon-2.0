"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        currentScrollPos < 200 || prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header
      className={`fixed top-0 z-50 flex h-14 w-full items-center transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0 backdrop-blur-md" : "-translate-y-20"
      } `}
    >
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-10">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold">
          Mohon
        </Link>

        {/* Desktop Navigation */}

        <DesktopMenu />

        {/* Mobile Menu Icon for Smaller Screens */}
        <div className="lg:hidden">
          <MobileMenu /> {/* Render the MobileMenu component here */}
        </div>

        {/* Call to Action & Social Media for Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Call to Action Button */}
          <Link href="/">
            <Button variant="link">Pricing</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
