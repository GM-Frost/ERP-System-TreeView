import React from "react";

interface MenuItem {
  name: string;
  children?: MenuItem[];
}

interface MenuProps {
  onItemClick: (parent: string, current: string) => void;
  items: MenuItem[];
  parentPath?: string;
}

const Menu: React.FC<MenuProps> = ({ onItemClick, items, parentPath = "" }) => {
  const handleItemClick = (current: string) => {
    onItemClick(parentPath, current);
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.name} onClick={() => handleItemClick(item.name)}>
          {item.children ? (
            <>
              {item.name}
              <Menu
                items={item.children}
                onItemClick={onItemClick}
                parentPath={
                  parentPath ? `${parentPath}\\${item.name}` : item.name
                }
              />
            </>
          ) : (
            item.name
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
