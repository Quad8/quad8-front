import ProductItem from '@/components/Products/ProductItem';

export default function Page() {
  return (
    <>
      <ProductItem
        id="12"
        size="sm"
        imageUrl="https://cdn.imweb.me/thumbnail/20240531/1c4e2517e9231.jpg"
        title="몬스타기어 닌자 87PRO ALU 스폐셜 에디션 풀알루미늄 커스텀 키보드"
        price={120000}
        reviewCount={9}
      />
      <ProductItem
        id="12"
        size="lg"
        imageUrl="https://cdn.imweb.me/thumbnail/20240531/1c4e2517e9231.jpg"
        title="큰애"
        price={99000}
        reviewCount={100}
      />
    </>
  );
}
