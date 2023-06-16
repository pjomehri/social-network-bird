import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import fetcher from '@/lib/fetcher';
import Layout from '@/components/layout';
import LoginModal from '@/components/modals/login-modal';
import RegisterModal from '@/components/modals/register-modal';
import EditModal from '@/components/modals/edit-modal';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <Toaster />
        <EditModal />
        <RegisterModal />
        <LoginModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
