import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import styles from "./sidebar.module.css";
import { useTheme } from "next-themes";

const Sidebar = ({ allDocumentations, open, setOpen }) => {
  if (!Array.isArray(allDocumentations)) {
    return null;
  }

  const { theme } = useTheme();

  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories({
      ...openCategories,
      [category]: !openCategories[category],
    });
  };

  const categories = allDocumentations.reduce((acc, doc) => {
    const node = doc.node;
    const categories = node.categories.nodes.map((category) => category.name);
    if (categories.length === 0) {
      if (!acc["Uncategorized"]) {
        acc["Uncategorized"] = [];
      }
      acc["Uncategorized"].push(node);
    } else {
      categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(node);
      });
    }
    return acc;
  }, {});

  const sortedCategories = Object.entries(categories).sort(
    ([a], [b]) => Number(a.split(".")[0]) - Number(b.split(".")[0])
  );

  return (
    <div
      // className={classNames(styles.sidebar, styles.moveUp, {
      //   "light:bg-white-800 text-white-900 dark:bg-gray-800 dark:text-white":
      //     true, // colors
      //   "flex flex-col justify-between": true,
      //   "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true,
      //   "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true,
      //   "transition-transform .3s ease-in-out md:translate-x-0": true,
      //   "-translate-x-full": !open,
      // })}
      className={classNames(styles.sidebar, styles.moveUp, {
        "flex flex-col justify-between": true,
        "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true,
        "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true,
        "transition-transform .3s ease-in-out md:translate-x-0": true,
        "-translate-x-full": !open,
        [styles.dark]: theme === "dark",
        [styles.light]: theme === "light",
      })}
    >
      <nav className="md:sticky top-0 md:top-16">
        <ul className="p-2">
          {sortedCategories.map(([category, nodes]) => (
            <li key={category} className="mb-2">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center w-full text-left"
              >
                {openCategories[category] ? (
                  <FiChevronDown size={16} className="mr-1" />
                ) : (
                  <FiChevronRight size={16} className="mr-1" />
                )}
                <h2 className="flex-grow">{category}</h2>
              </button>
              <ul
                className={classNames("ml-2", {
                  hidden: !openCategories[category],
                })}
              >
                {Array.isArray(nodes) &&
                  nodes.map((node) => (
                    <li key={node.slug}>
                      <Link href={`/documentation/${node.slug}`}>
                        <span className="block py-1 text-sm">{node.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

// import React, { useState } from "react";
// import classNames from "classnames";
// import Link from "next/link";
// import { FiChevronDown, FiChevronRight } from "react-icons/fi";

// const Sidebar = ({ allDocumentations, isSidebarOpen, toggleSidebar }) => {
//   if (!Array.isArray(allDocumentations)) {
//     return null;
//   }

//   const [openCategories, setOpenCategories] = useState({});

//   const toggleCategory = (category) => {
//     setOpenCategories({
//       ...openCategories,
//       [category]: !openCategories[category],
//     });
//   };

//   // Make the category a parent list.
//   const categories = allDocumentations.reduce((acc, doc) => {
//     const node = doc.node;
//     const categories = node.categories.nodes.map((category) => category.name);
//     if (categories.length === 0) {
//       if (!acc["Uncategorized"]) {
//         acc["Uncategorized"] = [];
//       }
//       acc["Uncategorized"].push(node);
//     } else {
//       categories.forEach((category) => {
//         if (!acc[category]) {
//           acc[category] = [];
//         }
//         acc[category].push(node);
//       });
//     }
//     return acc;
//   }, {});

//   // Sort the list of categories in order.
//   const sortedCategories = Object.entries(categories).sort(
//     ([a], [b]) => Number(a.split(".")[0]) - Number(b.split(".")[0])
//   );

//   return (
//     <div className="fixed inset-y-0 left-0 md:static w-64 h-screen bg-white-100 z-50 overflow-y-auto mt-16 md:mt-0">
//       <div
//         className={classNames(
//           "transition-all duration-300 ease-in-out transform md:transform-none bg-white md:bg-transparent",
//           {
//             "-translate-x-full": !isSidebarOpen && "md:-translate-x-0",
//             "translate-x-0": isSidebarOpen || "md:translate-x-0",
//           }
//         )}
//       >
//         <div className="p-4 font-bold">Docs</div>
//         <main className="flex-1">
//           <ul className="p-2">
//             {sortedCategories.map(([category, nodes]) => (
//               <li key={category} className="mb-2">
//                 <button
//                   onClick={() => toggleCategory(category)}
//                   className="flex items-center w-full text-left"
//                 >
//                   {openCategories[category] ? (
//                     <FiChevronDown size={16} className="mr-1" />
//                   ) : (
//                     <FiChevronRight size={16} className="mr-1" />
//                   )}
//                   <h2 className="flex-grow">{category}</h2>
//                 </button>
//                 <ul
//                   className={classNames("ml-2", {
//                     hidden: !openCategories[category],
//                   })}
//                 >
//                   {Array.isArray(nodes) &&
//                     nodes.map((node) => (
//                       <li key={node.slug}>
//                         <Link href={`/documentation/${node.slug}`}>
//                           <span className="block py-1 text-sm">
//                             {node.title}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import classNames from "classnames";
// import Link from "next/link";
// import { FiMenu, FiChevronDown, FiChevronRight } from "react-icons/fi";

// const Sidebar = ({ allDocumentations }) => {
//   if (!Array.isArray(allDocumentations)) {
//     return null;
//   }

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [openCategories, setOpenCategories] = useState({});

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleCategory = (category) => {
//     setOpenCategories({
//       ...openCategories,
//       [category]: !openCategories[category],
//     });
//   };

//   // 카테고리를 상위 목록으로 만듭니다.
//   const categories = allDocumentations.reduce((acc, doc) => {
//     const node = doc.node;
//     const categories = node.categories.nodes.map((category) => category.name);
//     if (categories.length === 0) {
//       if (!acc["Uncategorized"]) {
//         acc["Uncategorized"] = [];
//       }
//       acc["Uncategorized"].push(node);
//     } else {
//       categories.forEach((category) => {
//         if (!acc[category]) {
//           acc[category] = [];
//         }
//         acc[category].push(node);
//       });
//     }
//     return acc;
//   }, {});

//   // 카테고리 목록을 순서대로 정렬합니다.
//   const sortedCategories = Object.entries(categories).sort(
//     ([a], [b]) => Number(a.split(".")[0]) - Number(b.split(".")[0])
//   );

//   return (
//     <div className="fixed inset-y-0 left-0 md:static w-64 h-screen bg-white-100 z-50 overflow-y-auto mt-16 md:mt-0">
//       <div className="md:hidden p-4 absolute z-10">
//         <button onClick={toggleSidebar} className="text-2xl">
//           <FiMenu />
//         </button>
//       </div>
//       <div
//         className={classNames(
//           "transition-all duration-300 ease-in-out transform md:transform-none bg-white md:bg-transparent",
//           {
//             "-translate-x-full": !isSidebarOpen && "md:-translate-x-0",
//             "translate-x-0": isSidebarOpen || "md:translate-x-0",
//           }
//         )}
//       >
//         <div className="p-4 font-bold">Docs</div>
//         <main className="flex-1">
//           <ul className="p-2">
//             {sortedCategories.map(([category, nodes]) => (
//               <li key={category} className="mb-2">
//                 <button
//                   onClick={() => toggleCategory(category)}
//                   className="flex items-center w-full text-left"
//                 >
//                   {openCategories[category] ? (
//                     <FiChevronDown size={16} className="mr-1" />
//                   ) : (
//                     <FiChevronRight size={16} className="mr-1" />
//                   )}
//                   <h2 className="flex-grow">{category}</h2>
//                 </button>
//                 <ul
//                   className={classNames("ml-2", {
//                     hidden: !openCategories[category],
//                   })}
//                 >
//                   {Array.isArray(nodes) &&
//                     nodes.map((node) => (
//                       <li key={node.slug}>
//                         <Link href={`/documentation/${node.slug}`}>
//                           <span className="block py-1 text-sm">
//                             {node.title}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import classNames from "classnames";
// import Link from "next/link";
// import { FiMenu, FiChevronDown, FiChevronRight } from "react-icons/fi";

// const Sidebar = ({ allDocumentations }) => {
//   if (!Array.isArray(allDocumentations)) {
//     return null;
//   }

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [openCategories, setOpenCategories] = useState({});

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleCategory = (category) => {
//     setOpenCategories({
//       ...openCategories,
//       [category]: !openCategories[category],
//     });
//   };

//   // 카테고리를 상위 목록으로 만듭니다.
//   const categories = allDocumentations.reduce((acc, doc) => {
//     const node = doc.node;
//     const categories = node.categories.nodes.map((category) => category.name);
//     if (categories.length === 0) {
//       if (!acc["Uncategorized"]) {
//         acc["Uncategorized"] = [];
//       }
//       acc["Uncategorized"].push(node);
//     } else {
//       categories.forEach((category) => {
//         if (!acc[category]) {
//           acc[category] = [];
//         }
//         acc[category].push(node);
//       });
//     }
//     return acc;
//   }, {});

//   // 카테고리 목록을 순서대로 정렬합니다.
//   const sortedCategories = Object.entries(categories).sort(
//     ([a], [b]) => Number(a.split(".")[0]) - Number(b.split(".")[0])
//   );

//   return (
//     <div className="fixed inset-y-0 left-0 md:static w-64 h-screen bg-white-100 z-50 overflow-y-auto mt-16 md:mt-0">
//       <div className="md:hidden p-4">
//         <button onClick={toggleSidebar} className="text-2xl">
//           <FiMenu />
//         </button>
//       </div>
//       <div
//         className={classNames(
//           "transition-all duration-300 ease-in-out transform md:transform-none bg-white md:bg-transparent",
//           {
//             "-translate-x-full": !isSidebarOpen && "md:-translate-x-0",
//             "translate-x-0": isSidebarOpen || "md:translate-x-0",
//           }
//         )}
//       >
//         <div className="p-4 font-bold">Docs</div>
//         <main className="flex-1">
//           <ul className="p-2">
//             {sortedCategories.map(([category, nodes]) => (
//               <li key={category} className="mb-2">
//                 <button
//                   onClick={() => toggleCategory(category)}
//                   className="flex items-center w-full text-left"
//                 >
//                   {openCategories[category] ? (
//                     <FiChevronDown size={16} className="mr-1" />
//                   ) : (
//                     <FiChevronRight size={16} className="mr-1" />
//                   )}
//                   <h2 className="flex-grow">{category}</h2>
//                 </button>
//                 <ul
//                   className={classNames("ml-2", {
//                     hidden: !openCategories[category],
//                   })}
//                 >
//                   {Array.isArray(nodes) &&
//                     nodes.map((node) => (
//                       <li key={node.slug}>
//                         <Link href={`/documentation/${node.slug}`}>
//                           <span className="block py-1 text-sm">
//                             {node.title}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </main>
//       </div>
//     </div>
//   );
// };
// export default Sidebar;

// import React, { useRef } from "react";
// import classNames from "classnames";
// import Link from "next/link";
// import Image from "next/image";

// import { useOnClickOutside } from "usehooks-ts";

// import { useState } from "react";

// const Sidebar = ({ allDocumentations }) => {
//   if (!Array.isArray(allDocumentations)) {
//     return null; // or return a default value
//   }

//   // 카테고리를 상위 목록으로 만듭니다.
//   const categories = allDocumentations.reduce((acc, doc) => {
//     const node = doc.node;
//     const categories = node.categories.nodes.map((category) => category.name);
//     if (categories.length === 0) {
//       if (!acc["Uncategorized"]) {
//         acc["Uncategorized"] = [];
//       }
//       acc["Uncategorized"].push(node);
//     } else {
//       categories.forEach((category) => {
//         if (!acc[category]) {
//           acc[category] = [];
//         }
//         acc[category].push(node);
//       });
//     }
//     return acc;
//   }, {});

//   // 카테고리 목록을 순서대로 정렬합니다.
//   const sortedCategories = Object.entries(categories).sort(
//     ([a], [b]) => Number(a.split(".")[0]) - Number(b.split(".")[0])
//   );

//   return (
//     <div className="bg-white-100 w-64 h-screen sticky top-0 overflow-y-auto">
//       <div className="p-4 font-bold">Docs</div>
//       <main className="flex-1">
//         <ul className="p-2">
//           {sortedCategories.map(([category, nodes]) => (
//             <li key={category} className="mb-2">
//               <h2>{category}</h2>
//               <ul className="ml-2">
//                 {Array.isArray(nodes) &&
//                   nodes.map((node) => (
//                     <li key={node.slug}>
//                       <Link href={`/documentation/${node.slug}`}>
//                         <span>{node.title}</span>
//                       </Link>
//                     </li>
//                   ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default Sidebar;
