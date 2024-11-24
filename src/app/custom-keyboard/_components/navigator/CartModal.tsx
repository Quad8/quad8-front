'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { StaticImageData } from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, RefObject, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { putUpdateCustomKeyboardData } from '@/api/cartAPI';
import { postCustomKeyboardOrder } from '@/api/customKeyboardAPI';
import { Button, Dialog, SignInModal } from '@/components';
import { POINT_KEY } from '@/constants/keyboardData';
import { ROUTER } from '@/constants/route';
import { KeyboardDataContext, StepContext } from '@/context';
import { getColorUpperCase } from '@/utils/getColorUpperCase';
import { getCustomKeyboardPrice } from '@/utils/getCustomKeyboardPrice';
import { getUpdatedCartCountData } from '@/utils/getUpdatedCartData';
import { blackSwitchImg, blueSwitchImg, brownSwitchImg, redSwitchImg } from '@/public/index';
import type { CartAPIDataType, ShopDataType } from '@/types/cartType';
import type { CustomKeyboardAPITypes, CustomKeyboardStepTypes, OptionDataType } from '@/types/customKeyboardType';
import type { Users } from '@/types/userType';
import CartModalOptionCard from './parts/CartModalOptionCard';

import styles from './CartModal.module.scss';

const cn = classNames.bind(styles);

interface CartModalProps {
  optionData: OptionDataType[];
  optionPrice: number;
  isOpenConfirmDialog: boolean;
  isOpenLoginModal: boolean;
  onClose: () => void;
  changeConfirmDialog: (value: boolean) => void;
  changeLoginModal: (value: boolean) => void;
  updateOptionPrice: (value: number) => void;
}

interface OrderListType {
  name: string;
  option1: string;
  option2?: boolean;
  price: number;
  count: number;
  imageSrc: string | StaticImageData;
  step: CustomKeyboardStepTypes;
  wrapperRef?: RefObject<HTMLDivElement>;
}

const SWITCH_LIST = {
  청축: blueSwitchImg,
  적축: redSwitchImg,
  갈축: brownSwitchImg,
  흑축: blackSwitchImg,
};

export default function CartModal({
  optionData,
  optionPrice,
  isOpenConfirmDialog,
  isOpenLoginModal,
  onClose,
  changeConfirmDialog,
  changeLoginModal,
  updateOptionPrice,
}: CartModalProps) {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const orderWrapperRef = useRef<HTMLDivElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    mutate: createCustomKeybaord,
    isSuccess: createMutationSuccess,
    isPending: createMutationPending,
  } = useMutation({
    mutationFn: (data: CustomKeyboardAPITypes) => postCustomKeyboardOrder(data),
  });

  const {
    mutate: updateCustomKeyboard,
    isSuccess: updateMutationSuccess,
    isPending: updateMutationPending,
  } = useMutation<void, Error, { id: number; data: Omit<CustomKeyboardAPITypes, 'option'> }>({
    mutationFn: ({ id, data }) => putUpdateCustomKeyboardData(id, data),
  });

  const {
    orderId,
    keyboardData: {
      type,
      texture,
      switchType,
      boardColor,
      baseKeyColor,
      hasPointKeyCap,
      pointKeyType,
      individualColor,
      pointKeySetColor,
      price,
      option,
    },
    deleteOption,
  } = useContext(KeyboardDataContext);

  const { keyboardImage, updateCurrentStep, updateStepStatus } = useContext(StepContext);

  const { boardPrice, keyCapPrice } = getCustomKeyboardPrice({
    type,
    texture,
    hasPointKeyCap,
    pointKeyType,
    individualColor,
  });
  const pointKeyCount = pointKeyType === '내 맘대로 바꾸기' ? Object.keys(individualColor).length : POINT_KEY.length;

  const isOverFlow = (option ? Object.entries(option).filter((element) => element[1]).length : 0) > 1;

  const orderList: OrderListType[] = [
    {
      name: '키득 베어본',
      option1: `${type} / ${getColorUpperCase(boardColor)} / ${texture}`,
      price: boardPrice,
      count: 0,
      imageSrc: keyboardImage.board,
      step: 'board',
    },
    {
      name: '키득 스위치',
      option1: switchType as string,
      price: 0,
      count: 0,
      imageSrc: switchType ? SWITCH_LIST[switchType] : '',
      step: 'switch',
    },
    {
      name: '키득 키캡',
      option1: `${getColorUpperCase(baseKeyColor)} / 포인트 키캡${hasPointKeyCap ? `o / ${pointKeyType}` : 'x'}`,
      option2: hasPointKeyCap,
      price: keyCapPrice,
      count: !hasPointKeyCap ? 0 : pointKeyCount,
      imageSrc: keyboardImage.keyCap,
      step: 'keyCap',
      wrapperRef: orderWrapperRef,
    },
  ];

  const handleClickPutButton = async () => {
    const id = params.get('orderId');
    const userData = queryClient.getQueryData<{ data: Users }>(['userData']);

    if (!userData?.data) {
      changeLoginModal(true);
      return;
    }

    const data = {
      type: type === '풀 배열' ? 'full' : 'tkl',
      texture: texture === '금속' ? 'metal' : 'plastic',
      boardColor,
      switchType,
      baseKeyColor,
      hasPointKeyCap,
      pointKeyType: hasPointKeyCap ? pointKeyType : null,
      pointSetColor: pointKeyType === '세트 구성' ? pointKeySetColor : null,
      price,
      individualColor: hasPointKeyCap && Object.keys(individualColor) ? individualColor : null,
      imgBase64: keyboardImage.keyCap,
    };

    if (!orderId || !id) {
      Object.assign(data, { option });
      createCustomKeybaord(data as CustomKeyboardAPITypes, {
        onError: () => {
          toast.error('장바구니 담기에 실패했습니다');
        },
        onSuccess: () => {
          const cartData = queryClient.getQueryData<CartAPIDataType>(['cartData']) ?? null;
          const newShopData: ShopDataType[] = optionData.map((element) => ({
            id: -1,
            productId: element.id,
            optionId: null,
            optionName: element.name,
            price: element.price,
            productTitle: element.name,
            thumbsnail: element.thumbnail,
            count: 1,
            classification: 'SHOP',
            category: 'etc',
          }));
          const newValue = getUpdatedCartCountData(cartData, newShopData);
          const temporaryId = Math.ceil(Math.random() * 10000);
          queryClient.setQueryData(['cartData'], {
            totalCount: newValue.totalCount + 1,
            SHOP: [...newValue.SHOP],
            CUSTOM: [
              ...newValue.CUSTOM,
              {
                id: temporaryId,
                productId: temporaryId,
                imgUrl: data.imgBase64,
                ...data,
                classification: 'CUSTOM',
              },
            ],
          });
          queryClient.invalidateQueries({ queryKey: ['cartData'] });
          toast.success('장바구니에 담았습니다', {
            onClose: () => {
              router.push(ROUTER.MY_PAGE.CART);
            },
          });
        },
      });
      return;
    }
    updateCustomKeyboard(
      { id: orderId, data: data as Omit<CustomKeyboardAPITypes, 'option'> },
      {
        onError: () => {
          toast.error('장바구니 수정에 실패했습니다');
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['cartData'] });
          toast.success('장바구니를 수정하였습니다', {
            autoClose: 1500,
            onClose: () => {
              router.push(ROUTER.MY_PAGE.CART);
            },
          });
        },
      },
    );
  };

  const handleClickEditButton = (e: MouseEvent<HTMLButtonElement>, step: CustomKeyboardStepTypes) => {
    e.stopPropagation();
    onClose();
    if (step !== 'keyCap') {
      updateStepStatus({ [step]: 'current', keyCap: 'completed' });
    }
    updateCurrentStep(step);
  };

  const handleClickCloseConfirm = () => {
    changeConfirmDialog(false);
  };

  const handleClickDeleteConfirm = () => {
    changeConfirmDialog(false);
    if (!deleteId) {
      toast.error('삭제할 제품을 찾지 못하였습니다');
      return;
    }
    deleteOption(deleteId);
    const deleteOptionCost = optionData.find((element) => element.id === deleteId)?.price;
    if (!deleteOptionCost) {
      toast.error('삭제할 제품을 찾지 못하였습니다');
      return;
    }
    updateOptionPrice(-deleteOptionCost);
    toast.success('상품을 삭제하였습니다');
  };

  const handleClickDeleteOption = (id: number) => {
    setDeleteId(id);
    changeConfirmDialog(true);
  };

  const isDisabled = createMutationPending || createMutationSuccess || updateMutationPending || updateMutationSuccess;

  return (
    <div className={cn('wrapper', { overflow: isOverFlow })}>
      <div className={cn('head-wrapper', { 'header-overflow': isOverFlow })}>
        <p className={cn('title')}>담은 상품</p>
      </div>
      <div className={cn('content-wraper')}>
        <div className={cn('order-wrapper')} ref={orderWrapperRef}>
          {orderList.map((element) => (
            <CartModalOptionCard
              key={element.name}
              name={element.name}
              option1={element.option1}
              option2={element.option2}
              buttonType='edit'
              price={element.price}
              count={element.count}
              imageSrc={element.imageSrc}
              buttonOnClick={(e) => handleClickEditButton(e, element.step)}
              wrapperRef={orderWrapperRef}
            />
          ))}
          {optionData.map(
            (element) =>
              option.includes(element.id) && (
                <CartModalOptionCard
                  key={element.id}
                  name='기타 용품'
                  option1={element.name}
                  price={element.price}
                  imageSrc={element.thumbnail}
                  buttonType='delete'
                  buttonOnClick={() => handleClickDeleteOption(element.id)}
                />
              ),
          )}
        </div>
        <div className={cn('count-price-wrapper')}>
          <p className={cn('count')}>총 합계</p>
          <p className={cn('price')}>{(price + optionPrice).toLocaleString()}원</p>
        </div>
      </div>
      <div className={cn('button-wrapper')}>
        <Button
          backgroundColor={isDisabled ? 'background-gray-40' : 'background-primary'}
          onClick={handleClickPutButton}
          disabled={isDisabled}
        >
          {orderId ? '수정하기' : '장바구니 담기'}
        </Button>
      </div>
      <Dialog
        message='정말 삭제하시겠습니까?'
        isOpen={isOpenConfirmDialog}
        iconType='warn'
        type='confirm'
        buttonText={{ left: '닫기', right: '삭제하기' }}
        onClick={{ left: handleClickCloseConfirm, right: handleClickDeleteConfirm }}
      />
      <SignInModal isOpen={isOpenLoginModal} onClose={() => changeLoginModal(false)} />
    </div>
  );
}
