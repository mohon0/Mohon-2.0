"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Send,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tl from-primary/10 via-primary/5 to-background px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="flex flex-col items-center text-center lg:col-span-2 lg:items-start lg:text-left">
            <h2 className="mb-4 text-3xl font-bold text-primary">
              MHN Graphics
            </h2>
            <p className="mb-6 max-w-xs text-muted-foreground">
              Transforming ideas into visual masterpieces. Your vision, our
              expertise.
            </p>
            <div className="mb-6 flex space-x-4">
              {[
                {
                  icon: Facebook,
                  label: "Facebook",
                  href: "https://www.facebook.com/www.md.mohon",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://www.twitter.com/mohongraphics",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/mohongraphics",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/mohongraphics",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  href: "https://www.github.com/mohon01",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
            <Button variant="outline">
              <Briefcase className="mr-2 h-4 w-4" /> Hire Me
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            <nav className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                {[
                  "Branding",
                  "Web Design",
                  "UI/UX",
                  "Print Design",
                  "Motion Graphics",
                ].map((service) => (
                  <li key={service}>
                    <Link
                      href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                {["About", "Portfolio", "Careers", "Blog", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <nav className="space-y-4">
              <h3 className="text-lg font-semibold">Jobs</h3>
              <ul className="space-y-2">
                {[
                  "Graphic Designer",
                  "UI/UX Designer",
                  "Web Developer",
                  "Motion Designer",
                  "Internships",
                ].map((job) => (
                  <li key={job}>
                    <Link
                      href={`/jobs/${job.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {job}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <h3 className="mb-4 text-center text-lg font-semibold">
            Stay Inspired
          </h3>
          <p className="mb-4 text-center text-muted-foreground">
            Join our newsletter for the latest design trends and exclusive
            offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto max-w-md"
          >
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="border-primary/20 bg-background/50 pr-10 backdrop-blur-sm focus:border-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 aspect-square h-full"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </form>
        </div>

        <Separator className="my-8 bg-primary/20" />

        <div className="flex flex-col items-center justify-between text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} MHN Graphics. All rights reserved.
          </p>
          <nav className="mt-4 flex flex-wrap justify-center space-x-4 sm:mt-0 sm:space-x-6">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Sitemap",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="transition-colors hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
