import React from 'react';

import { signOut } from 'next-auth/react';

import SidebarLogo from './sidebar-logo';
import SidebarItem from './sidebar-item';
import SidebarTweetButton from './sidebar-tweet-button';

import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import useCurrentUser from '@/hooks/useCurrentUser';

const Sidebar = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const items = [
    { label: 'Home', href: '/', icon: BsHouseFill },
    {
      label: 'notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hadNotification,
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label='Logout'
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
