import { useState } from "react";

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="menu-item"
        onClick={() => item.children && setIsOpen(!isOpen)}
      >
        {item.children && (isOpen ? "▼" : "▶")}
        {item.name}
      </button>

      {item.children && (
        <div className={`sub-menu ${isOpen ? "" : "sub-menu--shrunk"}`}>
          {item.children.length
            ? item.children.map((subitem) => (
                <MenuItem key={subitem.key} item={subitem} />
              ))
            : "-- Empty --"}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
