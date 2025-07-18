import { createContext, useContext } from 'react';
import { HiOutlineDocumentText, HiOutlineMagnifyingGlass, HiOutlineTrash } from 'react-icons/hi2';
import cn from 'classnames';
import type { Car } from '@/pages/home/model';
import { Button } from '@/shared/ui';
import styles from './Table.module.scss';

interface TableContext {
  columns: string;
}

interface TableProps {
  columns: string;
  children: React.ReactNode;
  className?: string;
}

interface LegendProps {
  children: React.ReactNode;
}

interface RowProps {
  car: Car;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onTrack: (id: number) => void;
}

interface BodyProps {
  data: Car[];
  render: (car: Car, index: number, array: Car[]) => React.ReactNode;
}

const initialContext = {
  columns: '1fr',
};

const TableContext = createContext<TableContext>(initialContext);

export function Table({ columns, children, className }: Readonly<TableProps>) {
  return (
    <TableContext value={{ columns }}>
      <div className={cn(styles.table, className)} role="table">
        {children}
      </div>
    </TableContext>
  );
}

function Legend({ children }: Readonly<LegendProps>) {
  const { columns } = useContext(TableContext);
  return (
    <div className={styles.legend} role="row" style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

function Row({ car, onDelete, onEdit, onTrack }: Readonly<RowProps>) {
  const { columns } = useContext(TableContext);

  return (
    <div className={styles.row} role="row" style={{ gridTemplateColumns: columns }}>
      <span>{car.name}</span>
      <span>{car.model}</span>
      <span>{car.year}</span>
      <span>{car.price}</span>
      <Button color="info" onClick={() => onTrack(car.id)}>
        <HiOutlineMagnifyingGlass />
        Track
      </Button>
      <Button color="safe" onClick={() => onEdit(car.id)}>
        <HiOutlineDocumentText />
        Edit
      </Button>
      <Button color="danger" onClick={() => onDelete(car.id)}>
        <HiOutlineTrash />
        Delete
      </Button>
    </div>
  );
}

function Body({ data, render }: Readonly<BodyProps>) {
  if (!data.length) return <p>No data to show at the moment</p>;
  return <section>{data.map(render)}</section>;
}

Table.Legend = Legend;
Table.Row = Row;
Table.Body = Body;
