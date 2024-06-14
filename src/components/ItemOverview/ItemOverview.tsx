// import classNames from 'classnames/bind';
// import styles from './ItemOverview.module.scss';

// const cn = classNames.bind(styles);

// const itemData = {
//   image_URL: undefined,
//   itemName: '키보드',
//   selected: '키보드 이름',
//   options: '옵션이 있으면 옵션',
//   detail: '디테일이 있으면 디테일',
// };

// interface ItemOverviewProps {
//   itemData: Object;
// }

// export default function ItemOverview({ itemData }: ItemOverviewProps) {
//   const { image_URL, itemName, selected, options, detail } = itemData;

//   return (
//     <article className={cn('content')}>
//       <div className={cn('item-image')}>
//         <Image src={image_URL} fill placeholder='blur' />
//       </div>
//       <div className={cn('item-text')}>
//         {/* <h1 className={cn('item-name')}>{itemName}</h1>
//         <h2 className={cn('item-selected')}>{selected}</h2>
//         <p className={cn('item-options')}>{options}</p>
//         <p className={cn('item-detail')}>{detail}</p> */}

//         <h1 className={cn('item-name')}>item입니다.</h1>
//       </div>
//     </article>
//   );
// }
