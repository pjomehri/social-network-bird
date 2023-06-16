import React from 'react';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

import Header from '@/components/header';
import NotificationsFeed from '@/components/notification-feed';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
