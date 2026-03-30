import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { MembersPage } from '../../src/pages/members-page';
import { server } from '../mocks/server';
import { renderWithProviders } from '../helpers/render';
import { mockMember, mockMembership } from '../mocks/fixtures';
import { BASE_URL } from '../mocks/base-url';

describe('Membership feature', () => {
  describe('Assign Membership', () => {
    beforeEach(() => {
      server.use(
        http.get(`${BASE_URL}/members/:id`, () => {
          return HttpResponse.json({
            data: {
              ...mockMember,
              memberships: [],
              checkins: [],
            },
          });
        }),
      );
    });

    it('should show assign membership form when member has no active membership', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => {
        expect(screen.getByTestId('no-membership-msg')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /assign membership/i })).toBeInTheDocument();
      });
    });

    it('should show plan cards when assign form is visible', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => {
        expect(screen.getByText('basic')).toBeInTheDocument();
        expect(screen.getByText('premium')).toBeInTheDocument();
        expect(screen.getByText('vip')).toBeInTheDocument();
      });
    });

    it('should assign membership successfully', async () => {
      server.use(
        http.get(`${BASE_URL}/members/:id`, () => {
          return HttpResponse.json({
            data: {
              ...mockMember,
              memberships: [],
              checkins: [],
            },
          });
        }),
      );

      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('assign-membership-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('plan-tier-basic'));

      const dateInput = screen.getByTestId('start-date-input');
      await userEvent.type(dateInput, new Date().toISOString().split('T')[0]);
      await userEvent.click(screen.getByTestId('assign-membership-btn'));

      server.use(
        http.get(`${BASE_URL}/members/:id`, () => {
          return HttpResponse.json({
            data: {
              ...mockMember,
              memberships: [mockMembership],
              checkins: [],
            },
          });
        }),
      );

      await userEvent.click(screen.getByRole('button', { name: /close/i }));
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => {
        expect(screen.getByTestId('place-checkin-btn')).toBeInTheDocument();
      });
    });
  });

  describe('Cancel Membership', () => {
    beforeEach(() => {
      server.use(
        http.get(`${BASE_URL}/members/:id`, () => {
          return HttpResponse.json({
            data: {
              ...mockMember,
              memberships: [mockMembership],
              checkins: [],
            },
          });
        }),
      );
    });

    it('should show cancel button when member has active membership', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => {
        expect(screen.getByTestId('cancel-membership-btn')).toBeInTheDocument();
      });
    });

    it('should show cancel form when cancel button is clicked', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('cancel-membership-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('cancel-membership-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('cancel-reason-input')).toBeInTheDocument();
        expect(screen.getByTestId('confirm-cancel-btn')).toBeInTheDocument();
      });
    });

    it('should show validation error if reason is too short', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('cancel-membership-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('cancel-membership-btn'));
      await waitFor(() => expect(screen.getByTestId('cancel-reason-input')).toBeInTheDocument());

      await userEvent.type(screen.getByTestId('cancel-reason-input'), 'short');
      await userEvent.click(screen.getByTestId('confirm-cancel-btn'));

      await waitFor(() => {
        expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('should cancel membership successfully', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('cancel-membership-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('cancel-membership-btn'));
      await waitFor(() => {
        expect(screen.getByTestId('cancel-reason-input')).toBeInTheDocument();
        expect(screen.getByTestId('confirm-cancel-btn')).toBeInTheDocument();
      });

      await userEvent.type(
        screen.getByTestId('cancel-reason-input'),
        'Member requested cancellation of membership',
      );

      server.use(
        http.get(`${BASE_URL}/members/:id`, () => {
          return HttpResponse.json({
            data: {
              ...mockMember,
              memberships: [],
              checkins: [],
            },
          });
        }),
      );

      await userEvent.click(screen.getByTestId('confirm-cancel-btn'));

      await waitFor(() => {
        expect(screen.queryByTestId('cancel-membership-btn')).not.toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /close/i }));
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => {
        expect(screen.queryByTestId('no-membership-msg')).toBeInTheDocument();
      });
    });

    it('should hide cancel form when keep membership is clicked', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('cancel-membership-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('cancel-membership-btn'));
      await waitFor(() => expect(screen.getByTestId('cancel-reason-input')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('keep-membership-btn'));

      await waitFor(() => {
        expect(screen.queryByTestId('cancel-reason-input')).not.toBeInTheDocument();
        expect(screen.getByTestId('cancel-membership-btn')).toBeInTheDocument();
      });
    });
  });

  describe('Place Check-in', () => {
    beforeEach(() => {
      server.use(
        http.get(`${BASE_URL}/members/:id`, () => {
          return HttpResponse.json({
            data: {
              ...mockMember,
              memberships: [mockMembership],
              checkins: [],
            },
          });
        }),
      );
    });

    it('should show check-in button when member has active membership', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => {
        expect(screen.getByTestId('place-checkin-btn')).toBeInTheDocument();
      });
    });

    it('should place check-in successfully', async () => {
      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('place-checkin-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('place-checkin-btn'));

      await waitFor(() => {
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
      });
    });

    it('should show error if check-in fails', async () => {
      server.use(
        http.post(`${BASE_URL}/check-in`, () => {
          return HttpResponse.json(
            {
              message: 'Member does not have an active membership',
              code: 'ACTIVE_MEMBERSHIP_NOT_FOUND',
            },
            { status: 403 },
          );
        }),
      );

      renderWithProviders(<MembersPage />);

      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId(`view-member-${mockMember.id}`));

      await waitFor(() => expect(screen.getByTestId('place-checkin-btn')).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('place-checkin-btn'));

      await waitFor(() => {
        expect(screen.getByText('Member does not have an active membership')).toBeInTheDocument();
      });
    });
  });
});
