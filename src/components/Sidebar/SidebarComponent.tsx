import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Sidebar";
import { links } from "./Links";
import { Link, Outlet } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SidebarComponent() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col gap-2">
            <SidebarLink
              link={{
                label: "Facebook",
                href: "https://facebook.com",
                icon: <IconBrandFacebook className="h-6 w-6 text-blue-600" />,
              }}
            />
            <SidebarLink
              link={{
                label: "Instagram",
                href: "https://instagram.com",
                icon: <IconBrandInstagram className="h-6 w-6 text-pink-500" />,
              }}
            />
            <SidebarLink
              link={{
                label: "LinkedIn",
                href: "https://linkedin.com",
                icon: <IconBrandLinkedin className="h-6 w-6 text-blue-700" />,
              }}
            />
            <SidebarLink
              link={{
                label: "Twitter",
                href: "https://twitter.com",
                icon: <IconBrandTwitter className="h-6 w-6 text-blue-400" />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Technovate 2025
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
