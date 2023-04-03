import type { ReactNode } from 'react';

type TableRow = ReactNode[];

interface Props {
  rows: TableRow[];
  header: TableRow;
}

export const Table = ({ header, rows }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          {header.map((cell, i) => (
            <th key={i}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
