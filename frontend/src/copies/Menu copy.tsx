import React from "react";

interface MenuProps {
  onItemClick: (parent: string, current: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onItemClick }) => {
  const handleItemClick = (parent: string, current: string) => {
    onItemClick(parent, current);
  };

  return (
    <div>
      <h2>Menu Component</h2>
      {/* Your menu items here, you can use your folder structure */}
      <div onClick={() => handleItemClick("Public\\components", "comp1.tsx")}>
        comp1.tsx
      </div>
      <div onClick={() => handleItemClick("Public\\components", "comp2.tsx")}>
        comp2.tsx
      </div>
      <div onClick={() => handleItemClick("VALVE\\Orifice", "Orifice")}>
        Orifice
      </div>
    </div>
  );
};

export default Menu;
