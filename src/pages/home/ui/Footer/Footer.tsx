import { FaGithub } from 'react-icons/fa';
import cn from 'classnames';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: Readonly<FooterProps>) {
  return (
    <footer className={cn(styles.footer, className)}>
      <address>
        <FaGithub />
        <a href="https://github.com/oleg-kuzmin" target="_blank">
          https://github.com/oleg-kuzmin
        </a>
      </address>
    </footer>
  );
}
