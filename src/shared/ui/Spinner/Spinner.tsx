import cn from 'classnames';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: Readonly<SpinnerProps>) {
  return (
    <div className={cn(styles.spinner, className)}></div>
  );
}