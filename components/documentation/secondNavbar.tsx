import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type Props = {
  onMenuButtonClick(): void;
};
const SecondNavbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-900": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling H-16이 위아래그거임
      })}
    >
      <div className="font-bold text-lg">Documentation</div>
      <div className="flex-grow"></div> {/** spacer */}
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};
export default SecondNavbar;
