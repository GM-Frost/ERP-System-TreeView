import MenuItem from "./MenuItem";

const Menu = ({ items }) => {
  return (
    <div className="wrapper">
      {items.children.map((item) => (
        <MenuItem item={item} />
      ))}
    </div>
  );
};

export default Menu;
