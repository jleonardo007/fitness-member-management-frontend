import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { checkInService } from '../services';
import type { PlaceCheckInDto } from '../types';

export const useCheckIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeCheckIn = useCallback(async (dto: PlaceCheckInDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await checkInService.placeCheckIn(dto);
      return res.data;
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { placeCheckIn, isLoading, error };
};
