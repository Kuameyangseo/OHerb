import {useQuery} from '@tanstack/react-query';
import axiosInstance from '../utils/axiosinstance';


const fetchUser = async () => {
  try {
    const res = await axiosInstance.get('/logged-in-user');
    return res.data.user;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null; // not logged in
    }
    throw error;
  }
};


export const useUser = (enabled = true) => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled,              // 🔥 key fix
    retry: false,         // ❗ don't retry 401
    staleTime: 5 * 60 * 1000,
  });

  return { user, isLoading, isError, refetch };
};
export default useUser;