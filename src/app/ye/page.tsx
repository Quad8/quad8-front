import Pagination from '@/components/Pagination/Pagination';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <h1>페이지 콘텐츠</h1>
        <Pagination count={100} limit={16} />
      </Suspense>
    </div>
  );
}
