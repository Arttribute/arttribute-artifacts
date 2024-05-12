"use client";
import { Button } from "@/components/ui/button";

const AttributeButton = ({
  purpose,
  id,
}: {
  purpose: "collections" | "artifacts";
  id: string;
}) => {
  const makeAttribution = async (id: string) => {
    const res = await fetch(`/api/${purpose}/${id}/attributions`, {
      method: "POST",
      body: JSON.stringify({ web3Address: "0x1234" }), // TODO: replace with logged in credentials
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const onAttribute = async () => {
    try {
      const data = await makeAttribution(id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button className="w-full" onClick={onAttribute}>
      Make Attribution
    </Button>
  );
};

export default AttributeButton;
