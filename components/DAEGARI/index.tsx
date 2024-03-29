"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";

import { usePathname } from "next/navigation";
import { useTheme, ThemeProvider } from "next-themes";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import classNames from "classnames";
interface NavItem {
  label: string;
  page: string;
}

const navgiations = [
  { label: "Blog", path: "/blog" },
  { label: "Korean Sentences", path: "/korean" },
  { label: "Documentation", path: "/documentation" },

  // { label: "test", path: "/test" },
];

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const pathname = usePathname();
  const [navbar, setNavbar] = useState(false);
  return (
    // <header className="custom-navbar w-full mx-auto px-4 sm:px-20 z-50 shadow bg-background dark:border-b dark:border-stone-600 fixed top-0">
    // {/*
    <header
      className={classNames(
        `custom-navbar w-full mx-auto px-4 z-50 sm:px-20  shadow bg-background dark:border-b dark:border-stone-600 ${styles.navbar}`,
        {
          [styles.dark]: theme === "dark",
          [styles.light]: theme === "light",
        }
      )}
    >
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block ">
            <Link href="/">
              <div className="container flex items-center space-x-2">
                <h2 className="text-2xl font-bold">LOGO</h2>
              </div>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {navgiations.map((nav, index) => {
                return (
                  <Link key={index} href={nav.path}>
                    <span
                      className={`nav-link block lg:inline-block cursor-pointer hover:text-neutral-500 ${styles.mobileNavItem}`}
                      onClick={() => setNavbar(!navbar)}
                    >
                      {nav.label}
                    </span>
                  </Link>
                );
              })}

              {currentTheme === "dark" ? (
                <button
                  onClick={() => setTheme("light")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <RiSunLine size={25} color="black" />
                </button>
              ) : (
                <button
                  onClick={() => setTheme("dark")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <RiMoonFill size={25} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
