import { http, HttpResponse } from 'msw';
import { MembershipStatus } from '../../../src/types/enums';
import { mockMembership } from '../fixtures';
import { BASE_URL } from '../base-url';

export const membershipHandlers = [
  http.post(`${BASE_URL}/assign-membership`, () => {
    return HttpResponse.json({ data: mockMembership }, { status: 201 });
  }),

  http.post(`${BASE_URL}/cancel-membership`, () => {
    return HttpResponse.json({
      data: { ...mockMembership, status: MembershipStatus.CANCELED },
    });
  }),
];
