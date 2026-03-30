import { http, HttpResponse } from 'msw';
import { mockMember, mockMembership } from '../fixtures';
import { BASE_URL } from '../base-url';

export const memberHandlers = [
  http.get(`${BASE_URL}/members`, () => {
    return HttpResponse.json({
      data: [mockMember],
      meta: { total: 1, page: 1, pageSize: 20, totalPages: 1 },
    });
  }),

  http.get(`${BASE_URL}/members/search`, () => {
    return HttpResponse.json({ data: [mockMember] });
  }),

  http.get(`${BASE_URL}/members/:id`, () => {
    return HttpResponse.json({
      data: {
        ...mockMember,
        memberships: [mockMembership],
        checkins: [],
      },
    });
  }),

  http.post(`${BASE_URL}/create-member`, () => {
    return HttpResponse.json({ data: mockMember }, { status: 201 });
  }),

  http.get(`${BASE_URL}/plans`, () => {
    return HttpResponse.json({
      data: [
        {
          id: '00000000-0000-0000-0000-000000000010',
          tier: 'basic',
          price: 29.99,
          createdAt: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000011',
          tier: 'premium',
          price: 59.99,
          createdAt: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000012',
          tier: 'vip',
          price: 99.99,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }),
];
