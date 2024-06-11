'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames/bind';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

const cn = classNames.bind(styles);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalPortal({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(children, portalElement) as JSX.Element;
}

export default function Modal({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('style', 'overflow: hidden');
    }

    return () => document.body.setAttribute('style', 'overflow: auto');
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div className={cn('layout')}>
        <div ref={modalRef} className={cn('wrapper')}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
