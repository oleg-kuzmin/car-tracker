import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  color: 'safe' | 'danger' | 'neutral' | 'info';
  children: React.ReactNode;
  onClick?: VoidFunction;
  type?: HTMLButtonElement['type'];
  className?: string;
}

export function Button({ color, children, onClick, type, className }: Readonly<ButtonProps>) {
  let modifier: string;

  switch (color) {
    case 'safe':
      modifier = styles.button_safe;
      break;
    case 'danger':
      modifier = styles.button_danger;
      break;
    case 'neutral':
      modifier = styles.button_neutral;
      break;
    case 'info':
      modifier = styles.button_info;
      break;
    default:
      modifier = styles.button_neutral;
      break;
  }

  return (
    <button className={cn(styles.button, modifier, className)} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
