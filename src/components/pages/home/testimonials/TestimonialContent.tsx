import { TestimonialType } from "@/components/interface/TestimonialType";
import { FaStar } from "react-icons/fa6";

export const TestimonialContent = ({ review }: { review: TestimonialType }) => (
  <div className="mx-10 my-10 rounded-lg bg-light-gradient px-2 py-3 shadow-custom-light dark:bg-dark-gradient dark:shadow-custom-dark md:mt-20 md:px-10 md:py-12">
    <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
      <div>
        <h3 className="mb-2 text-2xl font-medium">{review.title}</h3>
        <span className="font-medium text-muted-foreground">
          {review.duration}
        </span>
      </div>
      <div className="flex gap-1 rounded bg-light-gradient px-3 py-2 text-xs text-yellow-500 shadow-custom-light dark:bg-dark-gradient dark:shadow-custom-dark">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
    </div>
    <p className="mt-11 leading-8 text-muted-foreground">
      {review.description}
    </p>
  </div>
);
