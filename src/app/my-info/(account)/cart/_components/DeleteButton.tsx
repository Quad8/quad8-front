'use client';

import { ReactNode, useContext, useState } from 'react';
import classNames from 'classnames/bind';

import { Button } from '@/components';
import { CartDataContext } from '@/context/CartDataContext';
import Dialog from '@/components/Dialog/Dialog';

import styles from './DeleteButton.module.scss';

const cn = classNames.bind(styles);

interface DeleteButtonProps {
  children: ReactNode;
}

export default function DeleteButton({ children }: DeleteButtonProps) {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const { checkedCustomList, checkedShopList, deleteCheckedData } = useContext(CartDataContext);

  const handleConfirmDialog = (value: boolean) => {
    setIsOpenConfirmDialog(value);
  };

  const handleAlertDialog = (value: boolean) => {
    setIsOpenAlertDialog(value);
  };

  const handledeleteCheckedData = () => {
    /* 삭제 api 보내기 */
    const checkedCustomIdList = Object.keys(checkedCustomList).filter((id) => checkedCustomList[id]);
    const checkedShopIdList = Object.keys(checkedShopList).filter((id) => checkedShopList[id]);
    deleteCheckedData(checkedCustomIdList, checkedShopIdList);
    handleConfirmDialog(false);
    handleAlertDialog(true);
  };

  return (
    <>
      <Button
        backgroundColor='outline-primary'
        width={90}
        radius={4}
        className={cn('button')}
        onClick={() => handleConfirmDialog(true)}
      >
        {children}
      </Button>
      <Dialog
        type='confirm'
        buttonText={{ left: '취소', right: '확인' }}
        onClick={{ left: () => handleConfirmDialog(false), right: handledeleteCheckedData }}
        message='상품을 삭제하시겠습니까?'
        isOpen={isOpenConfirmDialog}
        iconType='warn'
      />
      <Dialog
        type='alert'
        buttonText='확인'
        onClick={() => handleAlertDialog(false)}
        message='상품이 삭제되었습니다'
        isOpen={isOpenAlertDialog}
        iconType='accept'
      />
    </>
  );
}
