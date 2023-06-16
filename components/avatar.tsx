import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import useUser from '@/hooks/useUser';
import { BiBorderRadius } from 'react-icons/bi';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: user } = useUser(userId);
  const router = useRouter();

  const onClickHandler = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full hover:opacity-90 transition cursor-pointer relative
  `}
    >
      <Image
        alt='Avatar'
        fill
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        onClick={onClickHandler}
        src={user?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
