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
  const [tableApiData, setTableApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isDataPopulated, setIsDataPopulated] = useState<boolean>(false);

  const handleItemClick = (parent: string, child: string) => {
    setParentPath(parent);
    setSelectedChild(child);
    setIsDataPopulated(false);
  };

  const fetchDataAndPopulateTable = async () => {
    if (parentPath === "") {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:57002/api/bom${parentPath}`
      );
      const data = await response.json();
      setTableApiData(data);
      setIsDataPopulated(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuData();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
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
            {loading && menuData.length === 0 ? (
              <div className="text-center text-2xl">Fetching Menu...</div>
            ) : (
              <FolderFileStructure
                menuData={menuData}
                handleItemClick={handleItemClick}
              />
            )}
          </div>
        </div>
        <div className="col-span-3 justify-center items-center flex flex-col">
          <div>
            <div className="text-red-600 text-lg">
              Parent Src:{" "}
              <span className="uppercase">
                {parentPath || "No parent selected"}
              </span>
            </div>
            <div className="text-green-700 text-lg">
              Selected File:{" "}
              <span className="uppercase">
                {selectedChild || "No child selected"}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={fetchDataAndPopulateTable}
              className={`${
                parentPath === "" || isDataPopulated
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-transparent shadow-md font-semibold hover:bg-gray-500 duration-300 transition-colors hover:text-white"
              } py-2 px-4 border border-gray-500 rounded`}
              disabled={parentPath === "" || isDataPopulated}
            >
              Populate Table
            </button>
          </div>
          <span className="mt-4 text-sm font-light">
            <p>"Populate by Parent Value"</p>
          </span>
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
            {loading ? (
              <tbody className="bg-white">
                <tr>
                  <td
                    colSpan={Object.keys(tableData[0]).length}
                    className="text-center p-4"
                  >
                    Loading...
                  </td>
                </tr>
              </tbody>
            ) : tableApiData.length > 0 ? (
              <tbody className="bg-white">
                {tableApiData.map((row: any, index: number) => (
                  <tr key={index}>
                    {Object.values(row).map((value: any, index: number) => (
                      <td key={index} className="border border-black p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody className="bg-white">
                <tr>
                  <td
                    colSpan={Object.keys(tableData[0]).length}
                    className="text-center p-4"
                  >
                    Nothing to show
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </section>
    </main>
  );
};

export default App;
