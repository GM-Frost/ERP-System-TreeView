import React, { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";

const tree = {
  children: [
    { name: "empty_folder", subfolder: [] },
    {
      name: "public",
      children: [{ name: "index.html" }, { name: "favicon.ico" }],
    },
    {
      name: "src",
      children: [
        { name: "App.css" },
        { name: "App.tsx" },
        {
          name: "components",
          children: [{ name: "componentsA.tsx" }, { name: "componentsB.tsx" }],
        },
      ],
    },
    {
      name: "package.json",
    },
  ],
};

function App() {
  const [parentChildPart, setParentChildPart] = useState(null);
  const [currentPart, setCurrentPart] = useState(null);

  const handleNodeClick = (name, isFolder) => {
    if (isFolder) {
      setParentChildPart(name);
      setCurrentPart(null);
    } else {
      const findParent = (node, targetName) => {
        if (node.children) {
          for (const child of node.children) {
            if (child.name === targetName) {
              setParentChildPart(node.name);
              break;
            }
            if (child.children) {
              findParent(child, targetName);
            }
          }
        }
      };

      findParent(tree, name);
      setCurrentPart(name);
    }
  };

  return (
    <div className="container mx-auto max-w-[1200px]">
      <header className="flex justify-center items-center font-semibold bg-gray-200 p-3">
        <div>Testing Functionality for Tree and Datagrid</div>
      </header>
      <main className="grid grid-cols-5 bg-black/40 p-2">
        <div className="col-span-2">
          <div className="w-full flex bg-white p-2 h-[300px] overflow-scroll rounded-sm">
            <Menu items={tree} onNodeClick={handleNodeClick} />
          </div>
        </div>
        <div className="col-span-3 justify-center items-center flex flex-col">
          <div className="text-red-600 text-lg">
            Parent Child Part:{" "}
            <span className="uppercase">{parentChildPart || "None"}</span>
          </div>
          <div className="text-green-700 text-lg">
            Current Part:{" "}
            <span className="uppercase">{currentPart || "None"}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
