import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as TicketActions from './ticket.actions';

import { TicketService } from '../../core/services/ticket.service';

import {
    map,
    mergeMap,
    catchError,
    of
} from 'rxjs';

@Injectable()
export class TicketEffects {

    loadTickets$ = createEffect(() =>

        this.actions$.pipe(

            ofType(TicketActions.loadTickets),

            mergeMap(() =>

                this.ticketService
                    .getTickets()

                    .pipe(

                        map(tickets =>

                            TicketActions.loadTicketsSuccess({

                                tickets

                            })

                        ),

                        catchError(error =>

                            of(

                                TicketActions.loadTicketsFailure({

                                    error

                                })

                            )

                        )

                    )

            )

        )

    );

    constructor(

        private actions$: Actions,

        private ticketService: TicketService

    ) { }

}