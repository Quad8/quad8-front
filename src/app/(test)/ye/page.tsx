import classNames from 'classnames/bind';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <ul className={cn('container')}>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-reorder')}>여기에 뭘</i>
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-th-large')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-bar-chart')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-tasks')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-bell')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-archive')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-comment')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-sitemap')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-thumbs-up')} />
        </a>
      </li>
      <li>
        <a className={cn('list-item')} href='/'>
          <i className={cn('icon-tumblr')} />
        </a>
      </li>
    </ul>
  );
}
