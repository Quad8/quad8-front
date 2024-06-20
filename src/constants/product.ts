import type { TabKeyword } from '@/types/ProductItem';

export const CATEGORY_MAP = {
  keyboard: '키보드',
  keycap: '키캡',
  switch: '스위치',
  etc: '기타용품',
} as const;

interface BaseOptions {
  MANUFACTURERS: string[];
}

interface SwitchTypesOptions extends BaseOptions {
  SWITCH_TYPES: string[];
}

type FilterOptionsType = {
  keyboard: SwitchTypesOptions;
  keycap: BaseOptions;
  switch: SwitchTypesOptions;
  etc: BaseOptions;
};

export const FILTER_OPTIONS: FilterOptionsType = {
  keyboard: {
    MANUFACTURERS: [
      '몬스타기어',
      '앱코',
      'AULA',
      'FL-ESPORTS',
      'Keydous',
      '바밀로',
      'LEOBOG',
      'NZXT',
      '더키',
      'DUCKY',
      'GrooveStone',
      '엠스톤',
      '체리',
      'Leopold',
    ],
    SWITCH_TYPES: [
      '리니어',
      '적축',
      '무접점',
      '회목축V4',
      '황축V3',
      '저소음피치축',
      '데이지축',
      '바이올렛축',
      '로즈축',
      '황축',
      '청축',
      '갈축',
      'TTC 골드핑크V2',
      '저소음축',
      '저소음리니어',
      '저소음넌클릭',
      '택타일',
      '카일사 스위치',
      '저소음갈축',
      '핑크축',
      '자스민축',
      '아이리스축',
      '저소음적축',
      '스피드실버축',
      '클리어축',
      '하늬축',
      '재잘축',
    ],
  },
  keycap: {
    MANUFACTURERS: [
      '몬스타기어',
      '키크론',
      '아이페이',
      '글로리어스',
      'COX',
      'Mountain',
      'ASUS',
      'Razer',
      'SPM',
      'VARMILO',
      '마이크로닉스',
    ],
  },
  switch: {
    MANUFACTURERS: [
      '몬스타기어',
      'SWK',
      '오테뮤',
      'TTC',
      '하이무',
      '게이트론',
      'JKDK',
      'Vertex',
      'HMX',
      'Akko',
      'CHERRY',
      'Bsun',
      'GEON',
      'Fadog',
      'Everglide',
      'JWK',
      'BuiltByNim',
      'Chaosera',
    ],
    SWITCH_TYPES: ['리니어', '택타일', '저소음'],
  },
  etc: {
    MANUFACTURERS: ['몬스타기어', '펀키스', 'TX keyboard', '스웨그키', '키크론', '게이트론'],
  },
};

type CategoryKey = keyof FilterOptionsType;

type CategoryValue<K extends CategoryKey> = FilterOptionsType[K];

export function getCategoryOptions<K extends CategoryKey>(category: K): CategoryValue<K> {
  return FILTER_OPTIONS[category];
}

export const TAB_KEYWORD: TabKeyword = {
  저소음: '직장인을 위한 무소음 키보드',
  가성비: '가성비 키보드',
  청축: '타건감이 좋은 키보드',
};
