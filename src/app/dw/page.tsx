'use client';

import Modal from '@/components/Modal/Modal';
import { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div>가나다라</div>
      <div>가나다라</div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div style={{ width: '500px', height: '500px', backgroundColor: '#ffffff' }}>test</div>
      </Modal>
    </div>
  );
}
