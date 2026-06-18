import { createAction, props } from '@ngrx/store';

import { Ticket } from '../../core/models/ticket.model';

export const loadTickets = createAction(
  '[Ticket] Load Tickets'
);

export const loadTicketsSuccess = createAction(
  '[Ticket] Load Tickets Success',
  props<{ tickets: Ticket[] }>()
);

export const loadTicketsFailure = createAction(
  '[Ticket] Load Tickets Failure',
  props<{ error: any }>()
);

export const addTicket = createAction(
  '[Ticket] Add Ticket',
  props<{ ticket: Ticket }>()
);

export const updateTicket = createAction(
  '[Ticket] Update Ticket',
  props<{ ticket: Ticket }>()
);

export const deleteTicket = createAction(
  '[Ticket] Delete Ticket',
  props<{ id: string }>()
);