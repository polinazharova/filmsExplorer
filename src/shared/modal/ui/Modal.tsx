import styles from './Modal.module.scss';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export const Modal = ({children, isOpen, handleClose} : ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    handleClose();
  }

  return ReactDOM.createPortal(
    <div className={styles['modal-overlay']} onClick={onClick}>
      <div className={styles['modal-content' ]} onClick={(event: React.MouseEvent) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
