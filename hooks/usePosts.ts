import useSWR from 'swr';

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';
  const { data, isLoading, error, mutate } = useSWR(url);

  return { data, isLoading, error, mutate };
};

export default usePosts;
