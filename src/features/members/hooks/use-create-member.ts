import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { memberService } from '../services';
import type { CreateMemberDto } from '../types';

export const useCreateMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMember = useCallback(async (dto: CreateMemberDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await memberService.createMember(dto);
      return res.data;
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createMember, isLoading, error };
};
