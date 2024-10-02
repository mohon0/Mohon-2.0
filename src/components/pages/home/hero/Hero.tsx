"use client";
import Header from "@/components/layout/Header/Header";
import img from "@/images/logo1.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuGithub } from "react-icons/lu";
import { SlSocialLinkedin } from "react-icons/sl";
import AnimatedText from "./AnimatedText";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the path changes

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]); // Add pathname as a dependency

  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen bg-background">
          <motion.div
            className="h-1.5 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
      {!isLoading && (
        <>
          <Header />
          <div className="mx-auto mb-10 md:mb-16 md:mt-10">
            <section className="grid grid-cols-1 items-center gap-10 px-4 py-4 md:grid-cols-2 md:px-10">
              {/* Text Section */}
              <motion.article
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                className="order-2 flex flex-col justify-center md:order-1"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-sm text-muted-foreground md:text-lg"
                >
                  Welcome to my world
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-3 text-3xl font-bold md:mt-5 md:text-5xl"
                >
                  I’m <span className="uppercase text-primary">md mohon</span>
                </motion.p>
                <AnimatedText />
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-6 text-sm text-muted-foreground md:mt-10 md:text-lg"
                >
                  I&#39;m a certified graphic designer, working with multiple
                  companies, and providing top-quality design services at
                  competitive prices. My expertise covers various graphic design
                  tasks, including brand identity, packaging, photo editing, and
                  more. If you have design projects, don&#39;t hesitate to
                  contact me, and we can discuss your needs.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-12 space-y-3 md:mt-16 md:space-y-5"
                >
                  <p className="text-muted-foreground">Connect With Me</p>
                  <div className="flex gap-5 md:gap-10">
                    {socialLinks.map(({ href, label, icon }) => (
                      <motion.div
                        key={href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-12 w-12 items-center justify-center rounded bg-light-gradient text-muted-foreground shadow-custom-light hover:border dark:bg-dark-gradient dark:shadow-custom-dark md:h-16 md:w-16"
                      >
                        <Link
                          href={href}
                          aria-label={label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icon}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.article>

              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                className="relative order-1 flex justify-center md:order-2 md:mt-0"
              >
                <motion.div
                  className="absolute bottom-0 z-0 h-64 w-64 bg-light-gradient shadow-custom-light dark:bg-dark-gradient dark:shadow-custom-dark md:h-[27rem] md:w-[26rem]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
                <Image
                  src={img}
                  alt="Sejar Parvez, a Full Stack Developer"
                  className="z-10 w-60 md:w-96"
                  priority
                />
              </motion.div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

// Social Media Links Data
const socialLinks = [
  {
    href: "https://www.facebook.com/sejarparvez",
    label: "Facebook",
    icon: <LuFacebook />,
  },
  {
    href: "https://www.twitter.com/sejarparvez",
    label: "Twitter",
    icon: <FaXTwitter />,
  },
  {
    href: "https://linkedin.com/in/sejarparvez",
    label: "LinkedIn",
    icon: <SlSocialLinkedin />,
  },
  {
    href: "https://www.github.com/sejarparvez",
    label: "GitHub",
    icon: <LuGithub />,
  },
];
