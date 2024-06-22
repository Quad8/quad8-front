'use client';

import { ReactNode, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { deleteCartData } from '@/api/cartAPI';
import { Button, Dialog } from '@/components';
import { CartDataContext } from '@/context/CartDataContext';

import styles from './DeleteButton.module.scss';

const cn = classNames.bind(styles);

interface DeleteButtonProps {
  children: ReactNode;
}

export default function DeleteButton({ children }: DeleteButtonProps) {
  const queryClient = useQueryClient();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const { checkedCustomList, checkedShopList } = useContext(CartDataContext);
  const deleteCart = useMutation({
    mutationFn: (idList: string[]) => deleteCartData(idList),
  });

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
    deleteCart.mutate([...checkedCustomIdList, ...checkedShopIdList], {
      onSuccess: () => {
        handleConfirmDialog(false);
        handleAlertDialog(true);
        queryClient.invalidateQueries({ queryKey: ['cartData'] });
      },
    });
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
