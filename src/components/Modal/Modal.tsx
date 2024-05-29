'use client';

import { useEffect, useState, useRef, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalPortal({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);
  if (!portalElement) return null;
  return ReactDOM.createPortal(children, portalElement) as JSX.Element;
}

export default function Modal({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) {
  const cn = classNames.bind(styles);
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);
  if (!isOpen) return null;
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
