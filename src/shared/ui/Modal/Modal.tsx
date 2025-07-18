import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styles from './Modal.module.scss';

interface ModalProps {
  active: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
}

export function Modal({ active, onClose, children }: Readonly<ModalProps>) {
  const handleClickOverlay = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (evt.target instanceof Element) {
      if (evt.target.classList.contains(styles.overlay)) {
        onClose();
      }
    }
  };

  useEffect(() => {
    function handleKeydownEscape(evt: KeyboardEvent) {
      if (evt.code && evt.code.toLowerCase() === 'escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeydownEscape);
    return () => {
      document.removeEventListener('keydown', handleKeydownEscape);
    };
  }, [onClose]);

  if (!active) return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleClickOverlay}>
      <div className={styles.modal}>
        <button className={styles.modal__buttonClose} onClick={onClose}>
          <HiXMark />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
