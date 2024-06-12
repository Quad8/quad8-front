import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import defaultImage from '@/public/images/defaultProfile.png';
import styles from './ProfileImage.module.scss';

const cn = classNames.bind(styles);

type ProfileImageProp = {
  profile?: StaticImageData;
};

export default function ProfileImage({ profile }: ProfileImageProp) {
  return (
    <div className={cn('image-div')}>
      {profile ? (
        <Image src={profile} alt='프로필 이미지' width={64} height={64} />
      ) : (
        <Image src={defaultImage} alt='기본 이미지' width={39} height={36} />
      )}
    </div>
  );
}
