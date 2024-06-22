import { Dropdown } from '@/components';

// interface MyPostsPageProps {
//   searchParams: { [key: string]: string | undefined };
// }

// interface ParamsType {
//   sort: string;
//   page: string;
//   size: string;
// }

const DROPDOWN_OPTIONS = ['최신순', '조회순', '인기순'];

export default function MyPostsPage() {
  return (
    <div>
      <Dropdown options={DROPDOWN_OPTIONS} sizeVariant='xs' />
    </div>
  );
}
