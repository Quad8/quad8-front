import Banner from './_components/Banner/Banner';
import CustomGuide from './_components/Guide/CustomGuide';
import Hero from './_components/Hero/Hero';
import KeydeukBest from './_components/KeydeukBest/KeydeukBest';
import KeydeukPick from './_components/KeydeukPick/KeydeukPick';
import TextTickerSection from './_components/TextTicker/TextTickerSection';

export default async function Home() {
  return (
    <>
      <Hero />
      <CustomGuide />
      <TextTickerSection />
      <KeydeukPick />
      <KeydeukBest />
      <Banner />
    </>
  );
}
