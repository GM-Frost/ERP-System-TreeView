import React from "react";
import Menu from "./components/Menu";

const folderStructure = {
  file: [
    {
      name: "VALVE",
      children: [
        {
          name: "Body",
          children: [],
        },
        {
          name: "Orifice_Gasket",
          children: [],
        },
        {
          name: "Orifice",
          children: [
            {
              name: "Orifice_PL",
              children: [],
            },
            {
              name: "OPLT_Retainer_Bot",
              children: [],
            },
            {
              name: "OPLT_REFY",
              children: [],
            },
            {
              name: "Orifice_PTab",
              children: [],
            },
            {
              name: "OPLT_PTal_Strip",
              children: [],
            },
          ],
        },
        {
          name: "Disc",
          children: [],
        },
      ],
    },
    {
      name: "Public",
      children: [
        {
          name: "Buttons",
        },
        {
          name: "Readme",
        },
        {
          name: "Files",
        },
        {
          name: "components",
          children: [
            {
              name: "comp1",
            },
            {
              name: "comp2",
            },
          ],
        },
      ],
    },
  ],
};

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

const App: React.FC = () => {
  const handleMenuItemClick = (parent: string, current: string) => {
    console.log(`Parent: ${parent}, Current: ${current}`);
  };

  return (
    <main className="container mx-auto max-w-[1200px] bg-gray-200 p-1">
      <header className="flex justify-center items-center font-semibold  p-3">
        <div>Testing Functionality for Tree and Datagrid</div>
      </header>
      <section className="grid grid-cols-5 bg-black/40 p-2 border border-black rounded-sm">
        <div className="col-span-2">
          <div className="w-full flex bg-white p-2 h-[300px] overflow-scroll rounded-sm">
            <Menu
              onItemClick={handleMenuItemClick}
              items={folderStructure.file}
            />
          </div>
        </div>
        <div className="col-span-3 justify-center items-center flex flex-col">
          <div>
            <div className="text-red-600 text-lg">
              Parent Src: <span className="uppercase">VALVE\Orifice</span>
            </div>
            <div className="text-green-700 text-lg">
              Selected File: <span className="uppercase">Orifice</span>
            </div>
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
