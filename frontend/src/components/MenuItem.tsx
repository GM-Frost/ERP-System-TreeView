import { useState } from "react";

interface MenuItemProps {
  item: any;
  onItemSelected: (path: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    onItemSelected(item.name);
  };

  return (
    <div>
      <button className="menu-item" onClick={toggleOpen}>
        {item.children && (isOpen ? "▼" : "▶")}
        {item.name}
      </button>

      {item.children && (
        <div className={`sub-menu ${isOpen ? "" : "sub-menu--shrunk"}`}>
          {item.children.length
            ? item.children.map((subitem) => (
                <MenuItem
                  key={subitem.name}
                  item={subitem}
                  onItemSelected={onItemSelected}
                />
              ))
            : "-- Empty --"}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
