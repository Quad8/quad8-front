import Pagination from '@/components/Pagination/Pagination';

interface PageProps {
  searchParams: {
    page: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  return <Pagination page={searchParams.page} count={161} limit={16} />;
}
