"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons/lib";
import { ServicesData } from "./ServicesData";

interface Props {
  title: string;
  description: string;
  icon: IconType;
}

const FeatureModel = ({ data }: { data: Props }) => {
  const IconComponent = data.icon;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }, // Trigger when 10% of the component is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 }, // Slightly rotate and scale down
    visible: { opacity: 1, scale: 1, rotate: 0 }, // Reset to normal
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 15 }, // Scale up and rotate on hover
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-md bg-light-gradient p-5 shadow-custom-light transition-all duration-300 dark:bg-dark-gradient dark:shadow-custom-dark md:p-12"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <div className="flex flex-col gap-10">
          <motion.div
            className="text-primary"
            variants={iconVariants}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconComponent size={50} />
          </motion.div>

          <div className="flex flex-col gap-6">
            <p className="text-2xl font-bold">{data.title}</p>
            <p className="text-muted-foreground">{data.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default function Services() {
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="container mx-auto">
      <motion.div
        className="px-4 md:px-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center">
          <p className="my-4 text-4xl text-center font-bold lg:text-5xl">
            Services & Our Course
          </p>
        </div>
        <div className="my-10 grid grid-cols-1 gap-10 md:my-16 md:grid-cols-2 lg:grid-cols-3">
          {ServicesData.map((feature) => (
            <FeatureModel key={feature.id} data={feature} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
