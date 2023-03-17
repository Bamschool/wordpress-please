import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import styles from "./secondNavbar.module.css";
import { useTheme } from "next-themes";
type Props = {
  onMenuButtonClick(): void;
};

const SecondNavbar = (props: Props) => {
  const { theme } = useTheme();
  return (
    <nav
      className={classNames(styles.invertColors, {
        // "light:bg-white-800 text-white-900 dark:bg-gray-800 dark:text-white":
        // true, // colors

        "bg-white text-gray-900 dark:bg-gray-800 dark:text-white": true, // colors

        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling H-16이 위아래그거임
        [styles.dark]: theme === "dark",
        [styles.light]: theme === "light",
      })}
    >
      <div className="font-bold text-lg dark:text-white">Documentation</div>
      <div className="flex-grow"></div> {/** spacer */}
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default SecondNavbar;
