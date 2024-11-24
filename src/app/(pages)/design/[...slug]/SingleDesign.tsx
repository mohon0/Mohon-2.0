"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { DesignType } from "@/components/interface/DesignType";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageDimensions, getAspectRatio } from "@/utils/imageDimensions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthorAndTags, AuthorAndTagsSkeleton } from "./AuthorAndTags";
import { DesignDetails, DesignDetailsSkeleton } from "./DesignDetails";

interface PageProps {
  params: { slug: string[] };
}

export default function SingleDesign({ params }: PageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

  const [category, subcategory, day, month, year, name] = params.slug;

  const { isLoading, data, isError } = FetchSingleDesign({
    category,
    subcategory,
    day,
    month,
    year,
    name,
  });

  useEffect(() => {
    if (data?.image) {
      getImageDimensions(data.image)
        .then((dimensions) => setImageDimensions(dimensions))
        .catch((error) =>
          console.error("Failed to fetch image dimensions:", error),
        );
    }
  }, [data?.image]);

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          role="alert"
          aria-live="assertive"
          className="font-semibold text-red-500"
        >
          Error loading design.
        </div>
      </div>
    );
  }

  const { image, name: designName }: DesignType = data || {};

  const aspectRatio = imageDimensions
    ? getAspectRatio(imageDimensions.width, imageDimensions.height)
    : 1;
  const imageContainerClass =
    aspectRatio > 1.5 ? "h-auto aspect-[3/2]" : "h-[30rem] md:h-[40rem]";

  return (
    <div className="container mx-auto my-6 px-2 md:my-10 md:px-0">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {isLoading ? (
            <Skeleton className="h-[30rem] w-full md:h-[40rem]" />
          ) : (
            <div
              className={`relative flex w-full rounded-lg bg-secondary ${imageContainerClass}`}
            >
              <Image
                src={image}
                alt={designName || "Design image"}
                className={`rounded-lg object-contain transition-opacity duration-700 ease-in-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                fill
                priority
              />
            </div>
          )}
        </div>

        <Card className="h-fit lg:col-span-4">
          <CardContent className="space-y-4 pt-6">
            {isLoading ? (
              <DesignDetailsSkeleton />
            ) : (
              <DesignDetails data={data} imageDimensions={imageDimensions} />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-6 lg:mt-12">
        {isLoading ? <AuthorAndTagsSkeleton /> : <AuthorAndTags data={data} />}
      </div>
    </div>
  );
}
