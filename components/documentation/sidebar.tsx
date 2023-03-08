import Link from "next/link";

interface Props {
        allDocumentations: Array<{
    docstitle: Array<{ suptitle: string }>;
    slug: string;
    subtitle: string;
  }>;
}

const Sidebar: React.FC<Props> = ({ allDocumentations }) => {
  // Get unique docstitle and create an array
  const suptitles = Array.from(
    new Set(allDocumentations.map((doc) => doc.docstitle[0].suptitle))
  );

  // Convert suptitle to a number and sort them
  const sortedSuptitles = suptitles.sort((a, b) => {
    const aNumber = Number(a.split(".")[0]);
    const bNumber = Number(b.split(".")[0]);
    return aNumber - bNumber;
  });

  return (
    <div className="bg-white-100 w-64 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 font-bold">Docs</div>
      <ul className="p-2">
        {sortedSuptitles.map((suptitle) => (
          <li className="mb-2" key={suptitle}>
            <span className="text-gray-500">{suptitle}</span>
            <ul className="ml-2">
              {allDocumentations
                .filter((doc) => doc.docstitle[0].suptitle === suptitle)
                .map((doc) => (
                  <li className="mb-2" key={doc.slug}>
                    <Link href={`/documentation/${doc.slug}`}>
                      <a>{doc.subtitle}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

// import Link from "next/link";

// interface Category {
//   title: string;
//   pages: Array<{ subtitle: string; slug: string }>;
// }

// interface Props {
//   categories: Category[];
// }

// const Sidebar: React.FC<Props> = ({ categories }) => {
//   return (
//     <div className="bg-gray-100 w-64 h-screen sticky top-0 overflow-y-auto">
//       <div className="p-4 font-bold">Docs</div>
//       <ul className="p-2">
//         {categories.map((category) => (
//           <li className="mb-2" key={category.title}>
//             <span className="text-gray-500">{category.title}</span>
//             <ul className="ml-2">
//               {category.pages?.map((page) => (
//                 <li className="mb-2" key={page.slug}>
//                   <Link href={`/documentation/${page.slug}`}>
//                     <span className="text-blue-600 hover:text-blue-700">
//                       {page.subtitle}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
