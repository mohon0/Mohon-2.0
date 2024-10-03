import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const TestimonialArrowButton = ({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "left" | "right";
}) => {
  const Icon = direction === "left" ? FaArrowLeft : FaArrowRight;
  const positionClass = direction === "left" ? "right-[9rem]" : "right-12";
  return (
    <button
      aria-label="button"
      title="button"
      onClick={onClick}
      className={`absolute ${positionClass} text-primary-300 top-10 z-20 flex h-14 w-14 items-center justify-center rounded bg-light-gradient text-base shadow-custom-light transition-all duration-300 hover:text-primary dark:bg-dark-gradient dark:shadow-custom-dark`}
    >
      <Icon />
    </button>
  );
};
