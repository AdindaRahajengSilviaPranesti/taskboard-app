import { Ticket } from '../../core/models/ticket.model';

export interface TicketState {

    tickets: Ticket[];

    loading: boolean;

    error: any;

}

export const initialState: TicketState = {

    tickets: [],

    loading: false,

    error: null

};