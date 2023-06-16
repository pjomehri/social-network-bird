import useSWR from 'swr';

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/users');

  return { data, error, isLoading, mutate };
};

export default useUsers;
