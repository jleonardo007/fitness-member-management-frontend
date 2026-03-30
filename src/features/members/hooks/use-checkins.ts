import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { checkInService } from '../services';
import type { CheckIn } from '../types';

export const useCheckIns = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 0,
  });

  const fetchCheckIns = useCallback(async (page = 1, pageSize = 20) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await checkInService.getCheckIns(page, pageSize);
      setCheckIns(res.data);
      setMeta(res.meta);
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { checkIns, isLoading, error, meta, fetchCheckIns };
};
