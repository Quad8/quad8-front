import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './DetailImage.module.scss';

const cn = classNames.bind(styles);

interface DetailImageProps {
  detailsImg: string;
}

export default function DetailImage({ detailsImg }: DetailImageProps) {
  return (
    <div>
      <Image className={cn('detail-image')} src={detailsImg} width={1200} height={500} alt='상품 설명 이미지' />
    </div>
  );
}
