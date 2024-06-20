import { ROUTER } from '@/constants/route';
import { keydeukImg } from '@/public/index';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import styles from './CustomGuide.module.scss';
import Guide from './Guide';

const cn = classNames.bind(styles);

const GUIDE = [
  {
    step: 1,
    title: '배열 및 소재 선택',
    desc: ['내가 원하는 배열과 소재를 선택하고', '좋아하는 색상으로 커스텀 해보세요'],
    src: '/images/guide1.png',
  },
  {
    step: 2,
    title: '스위치 선택',
    desc: ['어떤 소리가 들리는지 몰라도 괜찮아요!', '듣고 싶은 스위치를 선택하면 소리가 들려요'],
    src: '/images/guide2.png',
  },
  {
    step: 3,
    title: '키캡 선택',
    desc: ['단일 색상인 키보드가 지겹지 않으셨나요?', '키득에선 다양한 색상으로 원하는 키캡을 커스텀 할 수 있어요'],
    src: '/images/guide3.png',
  },
  {
    step: 4,
    title: '장바구니',
    desc: ['배열부터 키캡까지 내 취향을 담은 커스텀 키보드를 구입해보세요'],
    src: '/images/guide4.png',
  },
];

export default function CustomGuide() {
  return (
    <section className={cn('custom-guide')}>
      <Image src={keydeukImg} width={145} height={145} alt='키득이미지' />
      <h1 className={cn('title')}>커스텀 용어가 어렵다면 키득이 도와줄게요</h1>
      <p className={cn('sub-title')}>3D 시뮬레이션으로 원하는 느낌 그대로 재현 할 수 있어요</p>
      <ul className={cn('guide-list')}>
        {GUIDE.map(({ step, title, desc, src }) => (
          <AnimatedSection key={step}>
            <Guide step={step} title={title} desc={desc} src={src} />
          </AnimatedSection>
        ))}
      </ul>
      <AnimatedSection>
        <h1 className={cn('title')}>키보드 득템할 준비가 되었다면?</h1>
      </AnimatedSection>
      <AnimatedSection>
        <Link href={ROUTER.CUSTOM_KEYBOARD} className={cn('button-area')}>
          <button type='button' className={cn('font-24')}>
            키보드 커스텀 하러 가기
          </button>
        </Link>
      </AnimatedSection>
    </section>
  );
}
