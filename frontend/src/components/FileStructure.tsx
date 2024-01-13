import React, { useState } from "react";

interface MenuItem {
  PARENT_NAME: string;
  COMPONENT_NAME?: string | null;
  Children?: MenuItem[];
}

interface FolderFileStructureProps {
  menuData: MenuItem[];
  handleItemClick: (parent: string, child: string) => void;
}

const FolderFileStructure: React.FC<FolderFileStructureProps> = ({
  menuData,
  handleItemClick,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemName: string) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(itemName)
        ? prevExpanded.filter((item) => item !== itemName)
        : [...prevExpanded, itemName]
    );
  };

  const isItemExpanded = (itemName: string) => expandedItems.includes(itemName);

  const renderMenu = (items: MenuItem[], parentPath: string = "") => {
    return items.map((item, index) => (
      <div key={index}>
        <div
          className="cursor-pointer"
          onClick={() => toggleItem(item.PARENT_NAME)}
        >
          {isItemExpanded(item.PARENT_NAME) ? "-" : "+"} {item.PARENT_NAME}
        </div>
        {item.Children && expandedItems.includes(item.PARENT_NAME) && (
          <div className="pl-4">
            {item.Children.map((child, index) => (
              <div key={index}>
                {child.COMPONENT_NAME ? (
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleItemClick(
                        `${parentPath}/${item.PARENT_NAME}`,
                        child.COMPONENT_NAME as string
                      )
                    }
                  >
                    {child.COMPONENT_NAME}
                  </div>
                ) : null}
                {child.Children &&
                  renderMenu(
                    child.Children,
                    `${parentPath}/${item.PARENT_NAME}`
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return <div>{renderMenu(menuData)}</div>;
};

export default FolderFileStructure;
