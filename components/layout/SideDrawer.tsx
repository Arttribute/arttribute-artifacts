import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { XIcon, Menu, Boxes, Library, Goal } from "lucide-react";
import { Logo } from "../branding/logo";
import Link from "next/link";

const drawerItems = [
  {
    title: "Artifacts",
    link: "#",
    icon: <Boxes className="w-4 h-4" />,
  },
  {
    title: "Collections",
    link: "#",
    icon: <Library className="w-4 h-4" />,
  },
  {
    title: "Attributions",
    link: "#",
    icon: <Goal className="w-4 h-4" />,
  },
];

const SideDrawer = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="block lg:hidden">
        <Button size="icon" variant="outline">
          <Menu className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full lg:w-2/5 rounded-none p-6">
        <div className="w-full flex justify-between">
          <Logo text="Arttibute" />
          <DrawerClose asChild className="block lg:hidden">
            <Button size="icon" variant="ghost">
              <XIcon className="w-5 h-5" />
            </Button>
          </DrawerClose>
        </div>
        <DrawerHeader className="justify-start">
          <DrawerTitle>All your items</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col space-y-4 mt-4">
          {drawerItems.map((item, index) => (
            <Button
              asChild
              key={index}
              variant="ghost"
              className="justify-start"
            >
              <Link href={item.link} className="flex items-center space-x-3">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
