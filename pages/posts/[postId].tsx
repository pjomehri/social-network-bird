import React from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import usePost from '@/hooks/usePost';
import Header from '@/components/header';
import PostItem from '@/components/posts/post-item';
import Form from '@/components/form';
import CommentFeed from '@/components/posts/comment-feed';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />{' '}
      </div>
    );
  }
  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
