import MenuItem from "./MenuItem";

const Menu = ({ items, onNodeClick }) => {
  return (
    <div className="wrapper">
      {items.children.map((item) => (
        <MenuItem key={item.name} item={item} onNodeClick={onNodeClick} />
      ))}
    </div>
  );
};

export default Menu;
