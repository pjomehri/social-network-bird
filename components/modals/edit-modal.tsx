import React, { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import Modal from '../modal';
import Input from '../input';
import ImageUpload from '../image-upload';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');

  const handleProfileImageChange = useCallback((image: string) => {
    setProfileImage(image);
  }, []);

  const handleCoverImageChange = useCallback((image: string) => {
    setCoverImage(image);
  }, []);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    handleCoverImageChange(coverImage);
    handleProfileImageChange(profileImage);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    profileImage,
    handleProfileImageChange,
    coverImage,
    handleCoverImageChange,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={handleProfileImageChange}
        label='Upload Profile Image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={handleCoverImageChange}
        label='Upload Cover Image'
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
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='save'
      onClose={editModal.onClose}
      onSubmit={onSubmitHandler}
      body={bodyContent}
    />
  );
};

export default EditModal;
