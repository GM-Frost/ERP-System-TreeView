import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";

const tree = {
  children: [
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
      name: "valve",
      children: [
        { name: "Body", children: [] },
        { name: "Orifice_gasket", children: [] },
        {
          name: "Orifice",
          children: [
            { name: "Orifice_PL", children: [] },
            { name: "OPLT_RETAINER_BOT", children: [] },
            { name: "OPLT_REFY", children: [] },
            { name: "ORIFICE_PTAB", children: [] },
          ],
        },
      ],
    },
    {
      name: "package.json",
    },
  ],
};

function App() {
  const [parentPart, setParentPart] = useState("");
  const [childPart, setChildPart] = useState("");

  const handleItemSelected = (path: string) => {
    if (!parentPart) {
      // Set the parentPart when it's empty
      setParentPart(path);
    } else {
      // Update the childPart by appending the selected path
      setChildPart(`${parentPart}\\${path}`);
    }
  };

  return (
    <main className="container mx-auto max-w-[1200px] bg-gray-200 p-1">
      <header className="flex justify-center items-center font-semibold  p-3">
        <div>Testing Functionality for Tree and Datagrid</div>
      </header>
      <section className="grid grid-cols-5 bg-black/40 p-2 border border-black rounded-sm">
        <div className="col-span-2">
          <div className="w-full flex bg-white p-2 h-[300px] overflow-scroll rounded-sm">
            <Menu items={tree} onItemSelected={handleItemSelected} />
          </div>
        </div>
        <div className="col-span-3 justify-center items-center flex flex-col">
          <div className="text-red-600 text-lg">
            Parent Child Part:{" "}
            <span className="uppercase">{parentPart || "None"}</span>
          </div>
          <div className="text-green-700 text-lg">
            Current Part:{" "}
            <span className="uppercase">{childPart || "None"}</span>
          </div>
          <div className="mt-4">
            <button className="bg-transparent shadow-md font-semibold hover:bg-gray-500 duration-300 transition-colors hover:text-white py-2 px-4 border border-gray-500 rounded">
              Populate Data in Tree
            </button>
          </div>
        </div>
      </section>
      <section className="mt-2 bg-black/40 p-2 border border-black rounded-sm">
        <div className="flex-grow overflow-auto">
          <table className="min-w-full mx-auto table-auto">
            <thead className="bg-black justify-between text-white text-center">
              <tr>
                <th>PARENT_NAME</th>
                <th>COMPONENT_NAME</th>
                <th>PART_NUMBER</th>
                <th>TITLE</th>
                <th>QUANTITY</th>
                <th>TYPE</th>
                <th>ITEM</th>
                <th>MATERIAL</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="border border-black p-2">ORIFICE</td>
                <td className="border border-black p-2">OPLT_PTAB_STRIP</td>
                <td className="border border-black p-2">03200-0309</td>
                <td className="border border-black p-2">
                  *PUNCHTAB SPACING STRIP
                </td>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">PART</td>
                <td className="border border-black p-2">B5</td>
                <td className="border border-black p-2">
                  K4.0.60 X 84-3/8 LG",SA-240-410S
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">ORIFICE</td>
                <td className="border border-black p-2">OPLT_PTAB_STRIP</td>
                <td className="border border-black p-2">03200-0309</td>
                <td className="border border-black p-2">
                  *PUNCHTAB SPACING STRIP
                </td>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">PART</td>
                <td className="border border-black p-2">B5</td>
                <td className="border border-black p-2">
                  K4.0.60 X 84-3/8 LG",SA-240-410S
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">ORIFICE</td>
                <td className="border border-black p-2">OPLT_PTAB_STRIP</td>
                <td className="border border-black p-2">03200-0309</td>
                <td className="border border-black p-2">
                  *PUNCHTAB SPACING STRIP
                </td>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">PART</td>
                <td className="border border-black p-2">B5</td>
                <td className="border border-black p-2">
                  K4.0.60 X 84-3/8 LG",SA-240-410S
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
