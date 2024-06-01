export const COMMUNITY_DATA = {
  id: 1032,
  user_id: 2337,
  title: '나는 키보드예요',
  content: '이것은 나의 키보드다다닫다ㅏㄷ다다다다',
  view_count: 323,
  created_at: '2024-06-01T05:56:13.073Z',
  updated_at: '2024-06-01T05:56:13.073Z',
};

export interface CommunityCardDataType {
  id: number;
  user_id: number;
  title: string;
  content: string;
  view_count: number;
  created_at: Date;
  updated_at: Date;
}
