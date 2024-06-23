import { IMAGE_BLUR } from '@/constants/blurImage';
import type { ReviewImage } from '@/types/ProductReviewTypes';
import Image from 'next/image';

interface RenderImagesProps {
  reviewImgs: ReviewImage[];
  className: string;
  width: number;
  height: number;
  altPrefix: string;
}

export default function RenderImages({ reviewImgs, className, width, height, altPrefix }: RenderImagesProps) {
  return (
    <>
      {reviewImgs.map((item, idx) => (
        <Image
          key={item.id}
          className={className}
          src={item.imageUrl}
          width={width}
          height={height}
          alt={`${altPrefix} ${idx + 1}`}
          placeholder={IMAGE_BLUR.placeholder}
          blurDataURL={IMAGE_BLUR.blurDataURL}
        />
      ))}
    </>
  );
}
