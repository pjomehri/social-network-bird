import { useRouter } from 'next/router';
import useUsers from '@/hooks/useUsers';
import React from 'react';
import Avatar from '../avatar';

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const router = useRouter();

  if (users.length === 0) {
    return null;
  }
  return (
    <div className='px-6 py-4 hidden lg:block'>
      <div className='bg-neutral-800 rounded-xl p-4'>
        <h2 className='text-white text-xl font-semibold'>Who to follow</h2>
        <div className='flex flex-col gap-6 mt-4'>
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className='flex flex-row gap-4'>
              <Avatar userId={user.id} />
              <div className='flex flex-col '>
                <p
                  onClick={() => {
                    router.push(`/users/${user.id}`);
                  }}
                  className='font-semibold text-white text-sm cursor-pointer'
                >
                  {user.name}
                </p>
                <p
                  onClick={() => {
                    router.push(`/users/${user.id}`);
                  }}
                  className='text-neutral-400 text-sm cursor-pointer'
                >
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
