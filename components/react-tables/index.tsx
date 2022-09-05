import { FC, useEffect, useState } from "react";
import { CellProps, useTable } from "react-table";

type CustomReactTable = {
  columns: Array<any>;
  data: any;
  handleEdit?: any;
  handleDelete?: any;
};

const CustomReactTable: FC<CustomReactTable> = ({
  columns,
  data,
  handleEdit,
  handleDelete,
}) => {
  const [newCol, setNewCol] = useState(columns);

  useEffect(() => {
    if (!handleEdit && !handleDelete) return;

    const actions = {
      Header: "Actions",
      Cell: (cell: CellProps<any>) => (
        <div>
          {handleEdit && <button onClick={() => handleEdit(cell)}>Edit</button>}
          {handleDelete && <button onClick={handleDelete}>Delete</button>}
        </div>
      ),
    };

    const newCols: any = [...columns, actions];

    setNewCol(newCols);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: newCol,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomReactTable;
