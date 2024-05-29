'use client';

import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.container}>
      <button type="button">모달창 띄우기</button>
      테스트페이지 mj
      <WriteEditModal />
    </div>
  );
}
