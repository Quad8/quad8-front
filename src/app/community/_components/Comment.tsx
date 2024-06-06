import React from 'react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

const cn = classNames.bind(styles);

export const comment = () => {
  return <div className={cn('container')}>comment</div>;
};
