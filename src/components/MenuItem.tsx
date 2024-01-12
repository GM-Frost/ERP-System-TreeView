import { useState } from "react";

const MenuItem = ({ item, onNodeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setIsOpen(!isOpen);
    } else {
      onNodeClick(item.name);
    }
  };

  return (
    <div>
      <button className="menu-item" onClick={handleClick}>
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
                  onNodeClick={onNodeClick}
                />
              ))
            : "-- Empty --"}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
