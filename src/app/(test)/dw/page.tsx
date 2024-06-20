'use client';

import Dialog from '@/components/Dialog/Dialog';
import { useState } from 'react';

export default function Page() {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  return (
    <div>
      <button type='button' onClick={() => setIsOpenAlert(true)}>
        alert 버튼
      </button>
      <button type='button' onClick={() => setIsOpenConfirm(true)}>
        confirm 버튼
      </button>
      <Dialog
        type='alert'
        iconType='accept'
        message='선택된 옵션이 없습니다.'
        isOpen={isOpenAlert}
        onClick={() => setIsOpenAlert(false)}
        buttonText='확인'
      />
      <Dialog
        type='confirm'
        message='선택된 옵션이 없습니다.\n선택된 옵션이 없습니다.'
        isOpen={isOpenConfirm}
        onClick={{ left: () => setIsOpenConfirm(false), right: () => setIsOpenConfirm(false) }}
        buttonText={{ left: '취소', right: '커스텀 만들러 가기' }}
      />
    </div>
  );
}
