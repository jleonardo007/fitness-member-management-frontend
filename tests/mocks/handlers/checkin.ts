import { http, HttpResponse } from 'msw';
import { mockCheckIn } from '../fixtures';
import { BASE_URL } from '../base-url';

export const checkInHandlers = [
  http.get(`${BASE_URL}/checkins`, () => {
    return HttpResponse.json({
      data: [mockCheckIn],
      meta: { total: 1, page: 1, pageSize: 20, totalPages: 1 },
    });
  }),

  http.post(`${BASE_URL}/check-in`, () => {
    return HttpResponse.json({ data: mockCheckIn });
  }),
];
