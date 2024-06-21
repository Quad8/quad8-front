import { ChevronIcon } from '@/public/index';
import classNames from 'classnames/bind';
import styles from './DeliveryStatus.module.scss';

const cn = classNames.bind(styles);

const DELIVERY_STATUS_LIST = [
  { label: '결제완료', count: 1 },
  { label: '배송준비중', count: 0 },
  { label: '배송중', count: 0 },
  { label: '배송완료', count: 0 },
];

export default function DeliveryStatus() {
  return (
    <ul className={cn('status-list')}>
      {DELIVERY_STATUS_LIST.map((status, i) => (
        <>
          <li key={status.label} className={cn('status-item')}>
            <span className={cn('status-count', { active: status.count > 0 })}>{status.count}</span>
            <span className={cn('status-label', { active: status.count > 0 })}>{status.label}</span>
          </li>
          {i < DELIVERY_STATUS_LIST.length - 1 && (
            <ChevronIcon className={cn('status-icon', { 'active-icon': status.count > 0 })} />
          )}
        </>
      ))}
    </ul>
  );
}
