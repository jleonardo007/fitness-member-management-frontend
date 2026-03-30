import { useState, useCallback } from 'react';
import { getApiError } from '@lib/api-client';
import { planService } from '../services/';
import type { Plan } from '../types/plan';

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await planService.getPlans();
      setPlans(res.data);
    } catch (err) {
      const { message } = getApiError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { plans, isLoading, error, fetchPlans };
};
