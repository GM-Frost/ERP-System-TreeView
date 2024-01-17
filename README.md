# BOM Treeview and Component Listing Project

## Objective
The main goal of this project is to tackle a common data manipulation challenge often encountered in ERP systems. The task involves working with two CSV files, `bom.csv` and `part.csv`, to construct a treeview based on the interrelations described in the `bom.csv` file. Additionally, a datagridview is implemented to display component parts of the selected part in the treeview, pulling relevant information from both files.

## Implementation

### 1. Data Conversion
- Convert `bom.csv` and `part.csv` into a format suitable for processing. Use SQL Server for this purpose, ensuring that entity framework is not employed in the implementation.

### 2. TreeView Construction
- Utilize the data from `bom.csv` to construct a treeview representing an indented multilevel Bill Of Material (BOM) with a depth of 5 levels.

### 3. Understanding BOM
- Conduct research to understand the concept of an indented multilevel Bill Of Material, which is crucial for accurate representation in the treeview.

### 4. DataGridView Implementation
- Implement a datagridview that complements the treeview by displaying the component parts of the currently selected part. Ensure the datagridview is blank when the selected part has no components.

### 5. DataGridView Columns
- Configure the datagridview with the following columns, pulling data from both `bom.csv` and `part.csv`:
  - COMPONENT_NAME (from BOM)
  - PART_NUMBER (from BOM)
  - TITLE (from PART)
  - QUANTITY (from BOM)
  - TYPE (from PART)
  - ITEM (from PART)
  - MATERIAL (from PART)

## Instructions
1. Convert CSV files to a suitable format, preferably using SQL Server.
2. Implement the treeview based on relationships defined in `bom.csv`.
3. Ensure the treeview displays 5 levels of an indented multilevel BOM.
4. Develop a datagridview that dynamically shows component parts of the selected part in the treeview.
5. Populate the datagridview with the specified columns, combining information from both `bom.csv` and `part.csv`.
6. Handle cases where a part has no components by displaying a blank datagridview.

## Additional Considerations
- Efficiently handle large datasets to ensure optimal performance.
- Document the code comprehensively, providing comments for clarity.
- Test the solution with various scenarios to validate its robustness.
- Consider scalability and maintainability in the code implementation.
