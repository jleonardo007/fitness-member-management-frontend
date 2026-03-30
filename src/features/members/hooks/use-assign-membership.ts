import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { membershipService } from '../services';
import type { AssignMembershipDto } from '../types';

export const useAssignMembership = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignMembership = useCallback(async (dto: AssignMembershipDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await membershipService.assignMembership(dto);
      return res.data;
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { assignMembership, isLoading, error };
};
