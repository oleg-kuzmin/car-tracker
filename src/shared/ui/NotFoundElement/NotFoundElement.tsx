import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import cn from 'classnames';
import { Button } from '@/shared/ui';
import styles from './NotFoundElement.module.scss';

interface NotFoundElementProps {
  onCancel: VoidFunction;
  className?: string;
}

export function NotFoundElement({ onCancel, className }: Readonly<NotFoundElementProps>) {
  console.error('Error. Car is not found 🙁.');

  return (
    <div className={cn(styles.notFoundElement, className)}>
      <p>Error. Car is not found 🙁.</p>
      <div className={styles.notFoundElement__buttonContainer}>
        <Button color="neutral" onClick={onCancel} type="button">
          <HiOutlineArrowSmallLeft />
          Back
        </Button>
      </div>
    </div>
  );
}
