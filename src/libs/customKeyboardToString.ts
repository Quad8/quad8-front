import { CustomKeyboardSwitchTypes, CustomKeyboardPointKeyType } from '@/types/CustomKeyboardTypes';

/**
 * 키보드 옵션을 화면에 보이는 text로 format 해주는 함수입니다. 해당 prop은 모두 필수 입니다.
 * @property {'full' | 'tkl'} type - 'full' 또는 'tkl'
 * @property {'metal' | 'plastic'} texture - 'metal' 또는 'plastic'
 * @property {string} boardColor - 색상 코드
 * @property {CustomKeyboardSwitchTypes} switchType - "청축" or "적축" or "갈축" or "흑축"
 * @property {string} baseKeyColor - 색상 코드
 * @property {boolean} hasPointKeyCap - boolean
 * @property {CustomKeyboardPointKeyType} pointKeyType - "내 맘대로 바꾸기" or "세트 구성"
 * @property {Object.<string, string>} individualColor - 각각의 색상 코드
 */

/**
 * Converts the custom keyboard options into a string representation.
 *
 * @param {CustomKeyboardOptions} data - 커스텀 키보드 옵션
 * @returns {string} 옵션들이 작성된 text와 각각 선택된 색상 코드 text가 배열 형태로 반환됩니다.
 */

interface CustomKeyboardOptions {
  type: 'full' | 'tkl';
  texture: 'metal' | 'plastic';
  boardColor: string;
  switchType: CustomKeyboardSwitchTypes;
  baseKeyColor: string;
  hasPointKeyCap: boolean;
  pointKeyType: CustomKeyboardPointKeyType;
  individualColor: Record<string, string>;
}

export const customKeyboardToString = (data: CustomKeyboardOptions) => {
  const type = data.type === 'full' ? '풀배열' : '텐키리스';
  const texture = data.texture === 'metal' ? '메탈' : '플라스틱';
  const hasPointKeyCap = data.hasPointKeyCap ? 'o' : 'x';

  const optionsText = `키득 베어본 - ${type}/${texture}/${data.boardColor}, 키득 스위치 - ${data.switchType}, 키득 키캡 - ${data.baseKeyColor}/포인트 키캡${hasPointKeyCap}-${data.pointKeyType}`;
  const keycapColorText = Object.entries(data.individualColor)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  return [optionsText, keycapColorText];
};
