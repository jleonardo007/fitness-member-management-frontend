import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { memberService } from '../services';
import type { Member } from '../types';

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 0,
  });

  const fetchMembers = useCallback(async (page = 1, pageSize = 20) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await memberService.getMembers({ page, pageSize });
      setMembers(res.data);
      setMeta(res.meta);
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchMembers = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await memberService.searchMembers({ query });
      setMembers(res.data);
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { members, isLoading, error, meta, fetchMembers, searchMembers };
};
