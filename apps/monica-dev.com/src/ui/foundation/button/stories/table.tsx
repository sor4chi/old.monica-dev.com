import type { ReactNode } from 'react';

import { FT } from '../../table';

type TableRow = ReactNode[];

interface Props {
  rows: TableRow[];
  header: TableRow;
}

export const Table = ({ header, rows }: Props) => {
  return (
    <FT.Table>
      <FT.Head>
        <FT.Row>
          {header.map((cell, i) => (
            <FT.Header key={i}>{cell}</FT.Header>
          ))}
        </FT.Row>
      </FT.Head>
      <FT.Body>
        {rows.map((row, i) => (
          <FT.Row key={i}>
            {row.map((cell, j) => (
              <FT.Data key={j}>{cell}</FT.Data>
            ))}
          </FT.Row>
        ))}
      </FT.Body>
    </FT.Table>
  );
};
