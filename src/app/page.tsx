import { getKeydeukPick } from '@/api/productAPI';
import CustomGuide from './_components/Guide/CustomGuide';
import Hero from './_components/Hero/Hero';
import KeydeukPick from './_components/KeydeukPick/KeydeukPick';
import TextTickerSection from './_components/TextTicker/TextTickerSection';

interface HomeProps {
  searchParams: { param: '저소음' | '가성비' | '청축' };
}

export default async function Home({ searchParams }: HomeProps) {
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
