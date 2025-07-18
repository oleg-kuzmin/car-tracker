import { IoReload } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '@/shared/ui';
import styles from './TryAgainElement.module.scss';

interface TryAgainElementProps {
  message: string;
  className?: string;
}

export function TryAgainElement({ message, className }: Readonly<TryAgainElementProps>) {
  const navigate = useNavigate();

  const handleReload = () => {
    navigate(0);
  };

  return (
    <div className={cn(styles.tryAgainElement, className)}>
      <p>Something went wrong 🙁.</p>
      <p>Error: {message}</p>
      <Button color="neutral" onClick={handleReload}>
        <IoReload />
        Try again
      </Button>
    </div>
  );
}
