import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      const isSure = confirm('Are you sure?');
      if (isSure) {
        if (e.key === 'Escape') {
          if (onClose) {
            onClose();
          } else {
            router.back();
          }
        }
      }
    },
    [onClose, router]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const isSure = confirm('Are you sure?');
    if (isSure) {
      if (e.target === e.currentTarget) {
        if (onClose) {
          onClose();
        } else {
          router.back();
        }
      }
    }
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
