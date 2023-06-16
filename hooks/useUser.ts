import useSWR from 'swr';

const useUser = (userId: String) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null
  );
  return { data, error, isLoading, mutate };
};

export default useUser;
