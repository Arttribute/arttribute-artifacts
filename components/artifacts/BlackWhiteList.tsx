import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Listed, { columns } from "./Listed";
import { addresses } from "@/lib/dummy";

type Props = {
  blacklist: ListedUser[];
  whitelist: ListedUser[];
  module: "artifacts" | "collections";
  id: string;
};

const BlackWhiteList = ({ blacklist, whitelist, module, id }: Props) => {
  const handleChangeList = async (
    directive: "black" | "white",
    list: ListedUser[],
    action: "add" | "remove"
  ) => {
    "use server";
    const res = await fetch(
      `${process.env.BASE_URL}/api/${module}/${id}/${directive}list`,
      {
        method: "PUT",
        body: JSON.stringify({ list, action }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update list");
    }

    return res.json();
  };
  return (
    <Tabs defaultValue="blacklist" className="w-[400px]">
      <TabsList className="w-full">
        <TabsTrigger value="blacklist" className="w-1/2">
          Blacklist
        </TabsTrigger>
        <TabsTrigger value="whitelist" className="w-1/2">
          Whitelist
        </TabsTrigger>
      </TabsList>
      <TabsContent value="blacklist">
        <Listed
          columns={columns}
          data={addresses}
          directive="black"
          handleChangeList={handleChangeList}
        />
      </TabsContent>
      <TabsContent value="whitelist">
        <Listed
          columns={columns}
          data={addresses}
          directive="white"
          handleChangeList={handleChangeList}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BlackWhiteList;
