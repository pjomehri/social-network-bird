import React, { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import Input from '../input';
import Modal from '../modal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', { email, name, username, password });

      toast.success('Account created');

      signIn('credentials', { email, password });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, name, username, password, registerModal]);

  const onToggle = () => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
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
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
        Already have an account?{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline '
        >
          sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title='Sign Up'
      isOpen={registerModal.isOpen}
      body={bodyContent}
      onSubmit={onSubmitHandler}
      onClose={registerModal.onClose}
      actionLabel='Register'
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default RegisterModal;

// isOpen,
// onClose,
// title,
// footer,
// actionLabel,
// disabled,
