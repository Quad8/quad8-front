import { getKeydeukPick } from '@/api/getProductList';
import CustomGuide from './_components/Guide/CustomGuide';
import Hero from './_components/Hero/Hero';
import KeydeukPick from './_components/KeydeukPick/KeydeukPick';
import TextTickerSection from './_components/TextTicker/TextTickerSection';

export default async function Home({ searchParams }: { searchParams: { param: '저소음' | '가성비' | '청축' } }) {
  const { data } = await getKeydeukPick(searchParams.param || '저소음');
  return (
    <>
      <Hero />
      <CustomGuide />
      <TextTickerSection />
      <KeydeukPick initialData={data} size='lg' />
    </>
  );
}
