import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { XIcon, Menu, Boxes, Library, Goal } from "lucide-react";
import { Logo } from "../branding/logo";
import Link from "next/link";

const drawerItems = [
  {
    title: "Artifacts",
    link: "/artifacts",
    icon: <Boxes className="w-4 h-4" />,
  },
  {
    title: "Collections",
    link: "/collections",
    icon: <Library className="w-4 h-4" />,
  },
  {
    title: "Attributions",
    link: "#",
    icon: <Goal className="w-4 h-4" />,
  },
];

export const CustomDrawerContent = ({
  isSmallScreen,
}: {
  isSmallScreen?: boolean;
}) => (
  <div className="space-y-6">
    {isSmallScreen && (
      <div className="w-full flex justify-between">
        <Logo text="Arttibute" />
        <DrawerClose asChild className="block lg:hidden">
          <Button size="icon" variant="ghost">
            <XIcon className="w-5 h-5" />
          </Button>
        </DrawerClose>
      </div>
    )}
    <h1 className="text-xl font-bold">All your items</h1>
    <div className="flex flex-col space-y-4 mt-4">
      {drawerItems.map((item, index) => (
        <Button asChild key={index} variant="ghost" className="justify-start">
          <Link href={item.link} className="flex items-center space-x-3">
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </Button>
      ))}
    </div>
  </div>
);

const SideDrawer = ({ isSmallScreen }: { isSmallScreen?: boolean }) => {
  return isSmallScreen ? (
    <Drawer direction="left">
      <DrawerTrigger asChild className="block lg:hidden">
        <Button size="icon" variant="outline">
          <Menu className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-3/5 md:w-2/5 rounded-none p-6">
        <CustomDrawerContent isSmallScreen />
      </DrawerContent>
    </Drawer>
  ) : (
    <CustomDrawerContent />
  );
};

export default SideDrawer;
