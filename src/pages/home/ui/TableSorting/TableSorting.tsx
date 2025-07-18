import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './TableSorting.module.scss';

interface TableSortingProps {
  className?: string;
}

export function TableSorting({ className }: Readonly<TableSortingProps>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', evt.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className={cn(styles.tableSorting, className)}>
      <select className={styles.tableSorting__select} onChange={handleChange} value={sortBy}>
        <option value="year-descending">Sorting by year (new first)</option>
        <option value="year-ascending">Sorting by year (old first)</option>
        <option value="price-descending">Sorting by price (high first)</option>
        <option value="price-ascending">Sorting by price (low first)</option>
      </select>
    </div>
  );
}
