import { createReducer, on } from '@ngrx/store';

import { initialState } from './ticket.state';

import * as TicketActions from './ticket.actions';

export const ticketReducer = createReducer(

    initialState,

    on(TicketActions.loadTickets, state => ({

        ...state,

        loading: true

    })),

    on(TicketActions.loadTicketsSuccess, (state, { tickets }) => ({

        ...state,

        loading: false,

        tickets

    })),

    on(TicketActions.loadTicketsFailure, (state, { error }) => ({

        ...state,

        loading: false,

        error

    }))

);