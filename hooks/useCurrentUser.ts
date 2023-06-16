import useSWR from 'swr';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current');

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
