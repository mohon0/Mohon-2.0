"use client";

import { productCategories } from "@/components/data/ProductCategory";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import img1 from "@/images/hero/1.jpg";
import img2 from "@/images/hero/2.jpg";
import img3 from "@/images/hero/3.jpg";
import { ChevronDown, Search } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const imageArray: StaticImageData[] = [img1, img2, img3];

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [backgroundImage, setBackgroundImage] = useState<StaticImageData>(img1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const randomImage =
      imageArray[Math.floor(Math.random() * imageArray.length)];
    setBackgroundImage(randomImage);
    setIsLoading(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/design?category=${encodeURIComponent(searchFilter)}&query=${encodeURIComponent(
        searchQuery,
      )}&page=1`,
    );
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="relative h-[29.5rem]">
        <Skeleton className="h-full w-full bg-gray-300" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-4 md:space-y-8 lg:space-y-10">
          <div className="w-full max-w-2xl text-center">
            <Skeleton className="mb-4 h-12 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="h-12 w-full max-w-xl rounded-full sm:max-w-2xl md:max-w-3xl" />
          <div className="flex w-full max-w-xl flex-wrap justify-center gap-2">
            {productCategories.map((_, index) => (
              <Skeleton key={index} className="h-10 w-20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        src={backgroundImage}
        alt="Hero banner image showcasing creative designs"
        width={1920}
        height={1080}
        priority
        placeholder="blur"
        className="h-[29.5rem] w-full object-cover brightness-50"
        onError={() => setError("Failed to load image")}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-black bg-opacity-40 px-4 md:space-y-8 lg:space-y-10">
        <div className="mt-10 text-center">
          <h1 className="mb-4 text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
            Create Great Designs, Faster
          </h1>
          <p className="text-sm text-slate-200 drop-shadow sm:text-base md:text-lg lg:text-xl">
            High-quality photos, videos, vectors, PSD, AI images, icons... to go
            from ideas to outstanding designs
          </p>
        </div>
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl"
        >
          <div className="flex items-center overflow-hidden rounded-lg bg-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:bg-gray-100 focus:ring-0 focus-visible:ring-0"
                  aria-label="Select search filter"
                >
                  {searchFilter} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="text-sm font-semibold">Categories</div>
                <DropdownMenuItem onSelect={() => setSearchFilter("all")}>
                  All
                </DropdownMenuItem>
                {productCategories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    onSelect={() => setSearchFilter(category.value)}
                  >
                    {category.value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                className="h-14 focus-visible:ring-0"
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search input"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 focus:ring-0"
                aria-label="Submit search"
              >
                <Search className="h-5 w-5 text-white" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
