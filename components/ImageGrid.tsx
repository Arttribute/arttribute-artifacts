"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

// FIXME: numCols not working as expected

const ImageGrid = ({ images }: { images: string[] }) => {
  const numImg = images.length;
  const numCols = Math.ceil(Math.sqrt(numImg));

  const gridClass = cn(`grid grid-cols-${numCols}`);

  return (
    <div className={gridClass}>
      {images.map((image, index) => (
        <div key={index} className="p-2">
          <Image
            src={image}
            alt={`artifact ${index + 1}`}
            width={400}
            height={400}
            className="object-cover rounded-lg aspect-square"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
