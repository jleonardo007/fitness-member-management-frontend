import { useState, useCallback } from 'react';
import { membershipService } from '../services';
import { getApiError } from '@lib/api-client';
import type { CancelMembershipDto } from '../types/membership';

export const useCancelMembership = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelMembership = useCallback(async (dto: CancelMembershipDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await membershipService.cancelMembership(dto);
      return res.data;
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { cancelMembership, isLoading, error };
};
