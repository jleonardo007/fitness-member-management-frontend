import { useState } from 'react';
import { getApiError } from '@lib/api-client';
import { useAuth } from '@/hooks';

export const useSignin = () => {
  const { signin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await signin(email, password);
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignin, isLoading, error };
};
