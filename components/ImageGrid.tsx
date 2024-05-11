import { cn } from "@/lib/utils";
import Image from "next/image";

const ImageGrid = ({ images }: { images: string[] }) => {
  const numImg = images.length;
  const numCols = Math.ceil(Math.sqrt(numImg));
  return (
    <div className={cn(`grid grid-cols-${numCols}`)}>
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
