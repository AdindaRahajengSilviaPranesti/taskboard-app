import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private api = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.api);
  }

  addTicket(ticket: any) {
    return this.http.post<Ticket>(this.api, ticket);
  }

  updateTicket(id: string, ticket: any) {
    return this.http.patch<Ticket>(`${this.api}/${id}`, ticket);
  }

  deleteTicket(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

}