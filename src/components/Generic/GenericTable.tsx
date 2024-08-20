import React from 'react';
import Table from 'react-bootstrap/Table';

interface Column {
  header: string;
  accessor: string;
}

interface DataItem {
  [key: string]: any;
}

interface GenericTableProps {
  columns: Column[];
  data: DataItem[];
  headerTheme: 'dark' | 'light';
  onEdit?: (item: DataItem) => void; // Añadir una función de callback opcional para manejar la edición
}

const GenericTable: React.FC<GenericTableProps> = ({ columns, data, headerTheme, onEdit }) => {
  return (
    <Table striped bordered hover>
      <thead className={headerTheme === 'dark' ? 'thead-dark' : 'thead-light'}>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
          <th>Acciones</th> {/* Añadir la columna de "Acciones" */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{item[column.accessor]}</td>
            ))}
            <td>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => onEdit && onEdit(item)} // Llama la función de callback si existe
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GenericTable;
