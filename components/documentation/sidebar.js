import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

import { useOnClickOutside } from "usehooks-ts";

import { useState } from "react";

const Sidebar = ({ allDocumentations }) => {
  if (!Array.isArray(allDocumentations)) {
    return null; // or return a default value
  }

  // 카테고리를 상위 목록으로 만듭니다.
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

  // 카테고리 목록을 순서대로 정렬합니다.
  const sortedCategories = Object.entries(categories).sort(
    ([a], [b]) => Number(a.split(".")[0]) - Number(b.split(".")[0])
  );

  return (
    <div className="bg-white-100 w-64 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 font-bold">Docs</div>
      <main className="flex-1">
        <ul className="p-2">
          {sortedCategories.map(([category, nodes]) => (
            <li key={category} className="mb-2">
              <h2>{category}</h2>
              <ul className="ml-2">
                {Array.isArray(nodes) &&
                  nodes.map((node) => (
                    <li key={node.slug}>
                      <Link href={`/documentation/${node.slug}`}>
                        <span>{node.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Sidebar;
