"use client";

import { useNavigate } from "react-router-dom";
import { Book, Menu, Sunset, Trees } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

export function Navbar1({
  logo = {
    url: "/",
    alt: "logo",
    title: "Daarsi",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Learn",
      url: "/cours",
      items: [
        {
          title: "Courses",
          description: "Explore our wide range of courses",
          icon: <Book className="size-5 shrink-0" />,
          url: "/courses",
        },
        {
          title: "Quizzes",
          description: "Test your knowledge interactively",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Tutorials",
          description: "Step-by-step guides for learning",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Contact Us",
          description: "We are here to help you",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check service status",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms",
          description: "Our terms and conditions",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
  ],
  auth = {
    login: { title: "Se connecter", url: "/login" },
    signup: { title: "S'inscrire", url: "/register" },
  },
}: Navbar1Props) {
  const navigate = useNavigate();

  // --- Helper Components (Moved inside to access 'navigate') ---

  const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
      <div
        className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors cursor-pointer"
        onClick={() => navigate(item.url)}
      >
        <div className="text-foreground">{item.icon}</div>
        <div>
          <div className="text-sm font-semibold">{item.title}</div>
          {item.description && (
            <p className="text-muted-foreground text-sm leading-snug">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-popover text-popover-foreground">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title} className="w-80">
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
          onClick={() => navigate(item.url)}
        >
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <div
                key={subItem.title}
                onClick={() => navigate(subItem.url)}
                className="flex items-center gap-2 py-2 cursor-pointer"
              >
                {subItem.icon}
                <span>{subItem.title}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <div
        key={item.title}
        onClick={() => navigate(item.url)}
        className="text-md font-semibold cursor-pointer py-2"
      >
        {item.title}
      </div>
    );
  };

  // --- Main Render ---

  return (
    <section className="py-4 border-b">
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div 
              onClick={() => navigate(logo.url)} 
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-xl font-bold tracking-tighter">
                {logo.title}
              </span>
            </div>
            
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(auth.login.url)}>
                {auth.login.title}
              </Button>
              <Button size="sm" onClick={() => navigate(auth.signup.url)}>
                {auth.signup.title}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => navigate(logo.url)} 
              className="font-bold text-xl cursor-pointer"
            >
              {logo.title}
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button variant="outline" onClick={() => navigate(auth.login.url)}>
                      {auth.login.title}
                    </Button>
                    <Button onClick={() => navigate(auth.signup.url)}>
                      {auth.signup.title}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}