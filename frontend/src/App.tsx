import React, { useEffect, useState } from "react";

import "./App.css";
import { fetchMenuData } from "./api/fetchmenu";
import FolderFileStructure from "./components/FileStructure";

const tableData = [
  {
    PARENT_NAME: "ORIFICE",
    COMPONENT_NAME: "OPLT_PTAB_STRIP",
    PART_NUMBER: "03200-0309",
    TITLE: "*PUNCHTAB SPACING STRIP",
    QUANTITY: 1,
    TYPE: "PART",
    ITEM: "B5",
    MATERIAL: 'K4.0.60 X 84-3/8 LG",SA-240-410S',
  },
];

interface File {
  PARENT_NAME: string;
  COMPONENT_NAME: string;
  TYPE: string;
  children?: File[];
}

const Folder: React.FC<{ folder: File }> = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleFolder} style={{ cursor: "pointer" }}>
        {folder.TYPE === "FOLDER" ? "- " : ""}
        {folder.PARENT_NAME}
      </div>
      {isOpen && folder.children && (
        <div style={{ paddingLeft: "20px" }}>
          {folder.children.map((child, index) => (
            <div key={index}>
              {child.TYPE === "FOLDER" ? (
                <Folder folder={child} />
              ) : (
                <div>{child.PARENT_NAME}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [menuData, setMenuData] = useState<File[]>([]);
  const [parentPath, setParentPath] = useState<string>("");
  const [selectedChild, setSelectedChild] = useState<string>("");

  const handleItemClick = (parent: string, child: string) => {
    setParentPath(parent);
    setSelectedChild(child);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMenuData();
      setMenuData(data);
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto max-w-[1200px] bg-gray-200 p-1">
      <header className="flex justify-center items-center font-semibold  p-3">
        <div>Testing Functionality for Tree and Datagrid</div>
      </header>
      <section className="grid grid-cols-5 bg-black/40 p-2 border border-black rounded-sm">
        <div className="col-span-2">
          <div className="w-full flex bg-white p-2 h-[300px] overflow-scroll rounded-sm">
            <FolderFileStructure
              menuData={menuData}
              handleItemClick={handleItemClick}
            />
          </div>
        </div>
        <div className="col-span-3 justify-center items-center flex flex-col">
          <div>
            <div className="text-red-600 text-lg">
              Parent Src:{" "}
              <span className="uppercase">
                {" "}
                {parentPath || "No parent selected"}
              </span>
            </div>
            <div className="text-green-700 text-lg">
              Selected File:{" "}
              <span className="uppercase">
                {" "}
                {selectedChild || "No child selected"}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button className="bg-transparent shadow-md font-semibold hover:bg-gray-500 duration-300 transition-colors hover:text-white py-2 px-4 border border-gray-500 rounded">
              Something Else
            </button>
          </div>
        </div>
      </section>
      <section className="mt-2 bg-black/40 p-2 border border-black rounded-sm">
        <div className="flex-grow overflow-auto">
          <table className="min-w-full mx-auto table-auto">
            <thead className="bg-black justify-between text-white text-center">
              <tr>
                {Object.keys(tableData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {tableData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index} className="border border-black p-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default App;
