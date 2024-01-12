import "./App.css";
import Menu from "./components/Menu";

const tree = {
  children: [
    { name: "empty_foler", children: [] },
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
  return <Menu items={tree}></Menu>;
}

export default App;
