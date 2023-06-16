import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../input';
import Modal from '../modal';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', { email, password });
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = () => {
    if (isLoading) return;
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        First time using -Social Network Bird-?{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline '
        >
          create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title='Login'
      isOpen={loginModal.isOpen}
      body={bodyContent}
      onSubmit={onSubmitHandler}
      onClose={loginModal.onClose}
      actionLabel='Login'
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default LoginModal;
