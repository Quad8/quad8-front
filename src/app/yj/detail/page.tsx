'use client';

import { Rating } from '@/components';
import ReviewItem from '@/components/ReviewItem/ReviewItem';
import type { Review } from '@/types/ReviewItem';

const MOCK_REVIEW: Review = {
  profile_img:
    'https://shop-phinf.pstatic.net/20240531_163/1717130380168HYcc2_JPEG/118266278871538393_1848108532.jpg?type=m510',
  star: 5,
  name: '닉네임',
  option: '황축',
  date: '2024.05.22',
  keyword: [{ 키감: '좋아요' }, { 색감: '좋아요' }, { 소리: '좋아요' }],
  content:
    '진짜 이쁘네용 ㅎㅎ 새하얀것 같아요! 미색이 조금 섞였을수도 있지만 제가 갖고 있던 키보드에 꽂았을때 잘 어울려서 자세히는 안봤네용! 마감도 깔끔했구 프린팅도 선명하고 이뻤어요! 다만 제 꺼에 맞는 특수키?가 없어서.. 이건 따로 사야할것 같아요! 그리구 맥용 키캡도 판매해 주시면 안될까여..? 제가 바라던 것보다 더 시끄러워서 놀랬지만 그런대로 만족합니당',
  imgList: [
    {
      id: 22,
      imgUrl:
        'https://shop-phinf.pstatic.net/20240531_163/1717130380168HYcc2_JPEG/118266278871538393_1848108532.jpg?type=m510',
    },
    {
      id: 23,
      imgUrl:
        'https://shop-phinf.pstatic.net/20240531_192/1717130388377bzMvv_JPEG/118266287077546178_816956476.jpg?type=f40',
    },
    {
      id: 24,
      imgUrl:
        'https://shop-phinf.pstatic.net/20240531_292/1717130388967ezfkB_JPEG/118266287670073205_571301720.jpg?type=f40',
    },
  ],
  like: 2,
};

export default function Page() {
  return (
    <div>
      <ReviewItem data={MOCK_REVIEW} />
      <ReviewItem isMyPage data={MOCK_REVIEW} />
      <Rating rating={5} usage='edit' />
      <Rating rating={3} usage='show' />
    </div>
  );
}
