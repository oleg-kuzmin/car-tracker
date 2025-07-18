import { useEffect } from 'react';
import { HiOutlineArrowSmallLeft, HiOutlineTrash } from 'react-icons/hi2';
import cn from 'classnames';
import { Button } from '@/shared/ui';
import styles from './ConfirmDelete.module.scss';

interface ConfirmDeleteProps {
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  className?: string;
}

export function ConfirmDelete({ onConfirm, onCancel, className }: Readonly<ConfirmDeleteProps>) {
  useEffect(() => {
    function handleKeydownEnter(evt: KeyboardEvent) {
      if (evt.code.toLowerCase() === 'enter') {
        onConfirm();
      }
    }
    document.addEventListener('keydown', handleKeydownEnter);
    return () => {
      document.removeEventListener('keydown', handleKeydownEnter);
    };
  }, [onConfirm]);

  return (
    <div className={cn(styles.confirmDelete, className)}>
      Are you sure you want to delete this car permanently? This action cannot be undone.
      <div className={styles.confirmDelete__buttons}>
        <Button color="neutral" onClick={onCancel} className={styles.confirmDelete__button}>
          <HiOutlineArrowSmallLeft />
          Back
        </Button>
        <Button color="danger" onClick={onConfirm} className={styles.confirmDelete__button}>
          <HiOutlineTrash />
          Yes
        </Button>
      </div>
    </div>
  );
}
