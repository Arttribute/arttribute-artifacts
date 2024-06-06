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
        <Listed id={id} columns={columns} data={addresses} directive="black" />
      </TabsContent>
      <TabsContent value="whitelist">
        <Listed id={id} columns={columns} data={addresses} directive="white" />
      </TabsContent>
    </Tabs>
  );
};

export default BlackWhiteList;
