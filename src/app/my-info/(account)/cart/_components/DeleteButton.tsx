'use client';

import { ReactNode, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCartData } from '@/api/cartAPI';
import { Button, Dialog } from '@/components';
import { CartDataContext } from '@/context/CartDataContext';
import { toast } from 'react-toastify';

interface DeleteButtonProps {
  children: ReactNode;
}

export default function DeleteButton({ children }: DeleteButtonProps) {
  const queryClient = useQueryClient();

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const { checkedCustomList, checkedShopList } = useContext(CartDataContext);

  const { mutate: deleteCart } = useMutation({ mutationFn: deleteCartData });

  const handleConfirmDialog = (value: boolean) => {
    setIsOpenConfirmDialog(value);
  };

  const handleAlertDialog = (value: boolean) => {
    setIsOpenAlertDialog(value);
  };

  const handleDeleteCheckedData = () => {
    const checkedCustomIdList = Object.keys(checkedCustomList).filter((id) => checkedCustomList[id]);
    const checkedShopIdList = Object.keys(checkedShopList).filter((id) => checkedShopList[id]);

    deleteCart([...checkedCustomIdList, ...checkedShopIdList], {
      onSuccess: () => {
        handleConfirmDialog(false);
        handleAlertDialog(true);
        queryClient.invalidateQueries({ queryKey: ['cartData'] });
      },
      onError: () => {
        toast.error('장바구니 수정에 실패하였습니다');
      },
    });
  };

  return (
    <>
      <Button
        backgroundColor='outline-primary'
        width={90}
        radius={4}
        paddingVertical={8}
        fontSize={14}
        onClick={() => handleConfirmDialog(true)}
        hoverColor='outline-primary-60'
      >
        {children}
      </Button>
      <Dialog
        type='confirm'
        buttonText={{ left: '취소', right: '확인' }}
        onClick={{ left: () => handleConfirmDialog(false), right: handleDeleteCheckedData }}
        message='장바구니에서 상품을 삭제하시겠습니까?'
        isOpen={isOpenConfirmDialog}
        iconType='warn'
      />
      <Dialog
        type='alert'
        buttonText='확인'
        onClick={() => handleAlertDialog(false)}
        message='해당 상품이 삭제되었습니다'
        isOpen={isOpenAlertDialog}
        iconType='accept'
      />
    </>
  );
}
