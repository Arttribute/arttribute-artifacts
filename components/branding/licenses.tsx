import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transparent use of art in the realm of generative AI",
};

const licenses = [
  {
    src: "/licenses/png/open-commercial-color.png",
    alt: "Arttribute Open License",
    title: "Arttribute Open License",
    description:
      "This license permits the use of art in AI-driven creative processes where the resultant output can be distributed or modified as long as an attribution to the original creator of the art is provided. The license allows for commercial use of the resultant output.",
  },
  {
    src: "/licenses/png/exclusive-color.png",
    alt: "Arttribute Exclusive License",
    title: "Arttribute Exclusive License",
    description:
      "This license permits the use of art exclusively by any agreed number of parties in AI-driven creative processes. The resultant output can be distributed or modified, including for commercial purposes, as long as an attribution to the original creator of the art is provided.",
  },
  {
    src: "/licenses/png/non-commercial-color.png",
    alt: "Arttribute Non-commercial License",
    title: "Arttribute Non-commercial License",
    description:
      "This license permits the use of art in AI-driven creative processes where the resultant output can be distributed or modified for non-commercial purposes only, as long as an attribution to the original creator of the art is provided.",
  },
  {
    src: "/licenses/png/exlusive-noncommercial-color.png",
    alt: "Arttribute Exclusive Non-commercial License",
    title: "Arttribute Exclusive Non-commercial License",
    description:
      "This license permits the use of art exclusively by any agreed number of parties in AI-driven creative processes. The resultant output can be distributed or modified for non-commercial purposes only, as long as an attribution is provided.",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="border rounded-lg mx-4  px-4 py-4">
        {licenses.map((license, index) => (
          <Card key={index} className="m-4 border-gray-300 rounded-xl ">
            <CardContent className="p-3">
              <div className="lg:flex items-center justify-center">
                <Image
                  src={license.src}
                  width={
                    license.src ===
                    "/licenses/png/exlusive-noncommercial-color.png"
                      ? 100
                      : 60
                  }
                  height={90}
                  alt={license.alt}
                  className="m-2 p-2"
                />
                <div className="m-1 p-1 ">
                  <h2 className=" font-bold">{license.title}</h2>
                  <p className="text-xs text-gray-500">{license.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
