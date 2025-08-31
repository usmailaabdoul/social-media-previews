import { cn } from "../../lib/utils";
import { memo } from "react";

const ImageCell = ({
  src,
  index,
  className,
  overlayCount = 0,
  objectFit = "cover", // 'cover' or 'contain'
}: {
  src: string;
  index: number;
  className?: string;
  overlayCount?: number;
  objectFit?: "cover" | "contain";
}) => {
  return (
    <div
      className={cn(
        "relative bg-black/10 overflow-hidden",
        className
      )}
    >
      <img
        src={src}
        alt={`Post image ${index + 1}`}
        className={cn(
          "w-full h-full",
          objectFit === "cover" ? "object-cover" : "object-contain"
        )}
      />
      {overlayCount > 0 && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-3xl font-bold cursor-pointer">
          +{overlayCount}
        </div>
      )}
    </div>
  );
};

export const FacebookImageGrid = ({ 
  imageArray,
  firstImageOrientation = "landscape",
}: { 
  imageArray: string[];
  firstImageOrientation?: "landscape" | "portrait";
}) => {

  if (!imageArray) {
    return null;
  }

  const count = imageArray.length;

  // === 1 IMAGE ===
  // Respects the image's natural aspect ratio up to a max height.
  if (count === 1) {
    return (
      <div className="h-[500px] overflow-hidden">
        <ImageCell
          src={imageArray[0]}
          index={0}
          className="h-full" // h-full now works because the parent has a fixed height
          objectFit="cover"
        />
      </div>
    );
  }

  // === 2 IMAGES ===
  if (count === 2) {
    const layout =
      firstImageOrientation === "portrait"
        ? "grid-cols-1 grid-rows-2" // Stacked vertically
        : "grid-cols-2 grid-rows-1"; // Side-by-side
    return (
      <div className={`grid ${layout} gap-1 h-[500px] rounded-lg overflow-hidden`}>
        {imageArray.map((file, i) => (
          <ImageCell key={i} src={file} index={i} />
        ))}
      </div>
    );
  }

  // === 3 IMAGES ===
  if (count === 3) {
    const layout =
      firstImageOrientation === "portrait"
        ? "grid-cols-2 grid-rows-2" // Tall image on left
        : "grid-cols-2 grid-rows-2"; // Wide image on top (same grid structure, different spans)

    return (
      <div className={`grid ${layout} gap-1 h-[500px]`}>
        <ImageCell
          src={imageArray[0]}
          index={0}
          className={
            firstImageOrientation === "portrait" ? "row-span-2" : "col-span-2"
          }
        />
        <ImageCell src={imageArray[1]} index={1} />
        <ImageCell src={imageArray[2]} index={2} />
      </div>
    );
  }

  // === 4 IMAGES ===
  if (count === 4) {
    const layout =
      firstImageOrientation === "portrait"
        ? "grid-cols-2 grid-rows-3" // 1 tall, 3 stacked
        : "grid-cols-2 grid-rows-2"; // 2x2 grid

    if (firstImageOrientation === "portrait") {
      return (
        <div className={`grid ${layout} gap-1 h-[600px]`}>
          <ImageCell src={imageArray[0]} index={0} className="row-span-3" />
          <ImageCell src={imageArray[1]} index={1} />
          <ImageCell src={imageArray[2]} index={2} />
          <ImageCell src={imageArray[3]} index={3} />
        </div>
      );
    }
    // Default 2x2 grid
    return (
      <div className={`grid ${layout} gap-1`}>
        {imageArray.map((file, i) => (
          <ImageCell key={i} src={file} index={i} className="aspect-square" />
        ))}
      </div>
    );
  }

  // === 5+ IMAGES ===
  // 2 images on top, 3 below, with an overlay on the 5th.
  if (count >= 5) {
    return (
      <div className="flex flex-col gap-1 h-[416px]">
        <div className="grid grid-cols-2 gap-1 flex-1">
          <ImageCell src={imageArray[0]} index={0} />
          <ImageCell src={imageArray[1]} index={1} />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <ImageCell src={imageArray[2]} index={2} className="aspect-square" />
          <ImageCell src={imageArray[3]} index={3} className="aspect-square" />
          <ImageCell
            src={imageArray[4]}
            index={4}
            overlayCount={count - 5}
            className="aspect-square"
          />
        </div>
      </div>
    );
  }

  return null;
};

export const InstagramPreview = memo(FacebookImageGrid);