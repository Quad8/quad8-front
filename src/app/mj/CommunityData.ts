export const COMMUNITY_DATA = {
  id: 1032,
  user_id: 2337,
  user_nickname: '고양이는고양닉네임',
  title: '나는 키보드예요',
  content: '이것은 나의 키보드다다닫다ㅏㄷ다다다다',
  image: [
    'https://mblogthumb-phinf.pstatic.net/MjAxODA2MTVfMjMy/MDAxNTI5MDQ3MzExNDg4.zZ7-1f8jVKJUUMdYuEBuiXVINLJEMwZLxufIriSOIo0g.wYn5X8tdmJtm8BWJsjbpMd29cQVCdrjUPgZ6BbyClaIg.JPEG.lhy7341/FB_IMG_1529024513438.jpg?type=w800',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxuw9bClnqcgtV30UYaBGjysldDEwqPhyg8Q&s',
    'https://file3.instiz.net/data/cached_img/upload/2018/06/22/14/eb6f4005da542f4dc5276a034e519607.jpg',
  ],
  good_count: 11,
  comment_count: 111,
  created_at: '2024-06-01T05:56:13.073Z',
  updated_at: '2024-06-01T05:56:13.073Z',
};

export interface CommunityCardDataType {
  id: number;
  user_id: number;
  user_nickname: string;
  title: string;
  content: string;
  image: string[];
  good_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
}
