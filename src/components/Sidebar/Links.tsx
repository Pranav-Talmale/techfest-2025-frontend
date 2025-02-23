import {
  ArrowLeft,
  Home,
  Users,
  Settings,
} from "lucide-react";

export const links = [
  {
    label: "Home",
    href: "#",
    icon: (
      <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Events",
    href: "#",
    icon: (
      <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Our Paterons",
    href: "#",
    icon: (
      <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Credits",
    href: "#",
    icon: (
      <ArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
