import React, { useState } from "react";

interface File {
  PARENT_NAME: string;
  COMPONENT_NAME: string;
  TYPE: string;
  children?: File[];
}

const Folder: React.FC<{ folder: File }> = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleFolder} style={{ cursor: "pointer" }}>
        {folder.TYPE === "FOLDER" ? "- " : ""}
        {folder.PARENT_NAME}
      </div>
      {isOpen && folder.children && (
        <div style={{ paddingLeft: "20px" }}>
          {folder.children.map((child, index) => (
            <div key={index}>
              {child.TYPE === "FOLDER" ? (
                <Folder folder={child} />
              ) : (
                <div>{child.PARENT_NAME}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
