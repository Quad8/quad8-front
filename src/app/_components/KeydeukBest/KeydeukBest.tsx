'use client';

import { getKeydeukBest } from '@/api/productAPI';
import ProductItem from '@/components/Products/ProductItem';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';
import styles from './KeydeukBest.module.scss';

const cn = classNames.bind(styles);

export default function KeydeukBest() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.LISTS(),
    queryFn: getKeydeukBest,
  });
  return (
    <section className={cn('keydeuk-best')}>
      <div className={cn('inner')}>
        <h1 className={cn('title')}>키득 BEST</h1>
        <ul className={cn('product-list')}>
          <Swiper
            loop
            spaceBetween={26}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {data?.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <ProductItem size='lg' {...product} hasShop={false} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ul>
      </div>
    </section>
  );
}
