"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-2">
          <HiBars3BottomRight size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 p-6">
        <nav className="flex flex-col gap-6 text-lg mt-8">
          <Link
            href="/"
            className="hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/"
            className="hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Design
          </Link>
          <Link
            href="/"
            className="hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Blood Bank
          </Link>
          <Link
            href="/"
            className="hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Best Computer T.C.
          </Link>
          <Link
            href="/"
            className="hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </nav>

        {/* Mode Toggle and Social Icons */}
        <div className="flex justify-between items-center mt-10">
          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
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
            >
              <FaSquareXTwitter
                size={20}
                className="hover:text-primary transition-colors"
              />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
