import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { memberService } from '../services';
import type { MemberDetail } from '../types';

export const useMember = () => {
  const [member, setMember] = useState<MemberDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMember = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await memberService.getMemberById(id);
      setMember(res.data);
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { member, isLoading, error, fetchMember };
};
