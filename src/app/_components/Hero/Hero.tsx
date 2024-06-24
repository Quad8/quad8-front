import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Hero.module.scss';
import IMAGES from './heroItem';

const cn = classNames.bind(styles);

export default function Hero() {
  return (
    <section className={cn('hero-section')}>
      <div className={cn('inner')}>
        <div className={cn('hero-box')}>
          <div className={cn('hero-item-container')}>
            {IMAGES.map((image, i) => (
              <Image
                key={image.src}
                src={image}
                alt={`배경 이미지 ${i}`}
                className={cn('hero-item')}
                sizes='(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px'
              />
            ))}
          </div>
          <div className={cn('title-container')}>
            <h2>키보드 득템 키득</h2>
            <h1>원하는 컬러, 소리, 타건감</h1>
            <div className={cn('animation-line')}>
              <h1>내 취향을 담은&nbsp;</h1>
              <div className={cn('typing-wrap')}>
                <span className={cn('typing')}>커스텀 키보드</span>
              </div>
            </div>
            <h1>초보도 쉽게 만들 수 있어요</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
