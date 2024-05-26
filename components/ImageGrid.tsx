import { cn } from "@/lib/utils";
import Image from "next/image";

const ImageGrid = ({ images }: { images: string[] }) => {
  const numImg = images.length;
  const numCols = Math.ceil(Math.sqrt(numImg));

  let gridClass;

  switch (numCols) {
    case 1:
      gridClass = "grid-cols-1";
      break;
    case 2:
      gridClass = "grid-cols-2";
      break;
    case 3:
      gridClass = "grid-cols-3";
      break;
    case 4:
      gridClass = "grid-cols-4";
      break;
    default:
      gridClass = "grid-cols-5";
  }

  return (
    <div className={cn(`grid ${gridClass} gap-2`)}>
      {images.map((image, index) => (
        <div key={index} className="border rounded-sm">
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
