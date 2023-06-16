import React from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import UserHero from '@/components/users/user-hero';
import UserBio from '@/components/users/user-bio';

import Header from '@/components/header';

import useUser from '@/hooks/useUser';
import PostFeed from '@/components/posts/post-feed';

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: user, isLoading } = useUser(userId as string);

  if (isLoading || !user) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={user?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
