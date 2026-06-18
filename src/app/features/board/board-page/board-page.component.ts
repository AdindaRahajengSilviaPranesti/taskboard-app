import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';

import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core/models/ticket.model';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketFormComponent } from '../../ticket/ticket-form/ticket-form.component';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    DragDropModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {

  tickets: Ticket[] = [];
  loading = false;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {

    this.loading = true;

    this.ticketService.getTickets().subscribe({

      next: data => {

        this.tickets = data;
        this.loading = false;

      },

      error: err => {

        console.error(err);
        this.loading = false;

        this.snackBar.open(
          'Gagal memuat data',
          'Tutup',
          { duration: 3000 }
        );

      }

    });

  }

  openAddDialog() {

    const dialogRef = this.dialog.open(TicketFormComponent, {

      width: '550px'

    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      const ticket = {

        ...result,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),

        order: 1

      };

      this.ticketService.addTicket(ticket).subscribe({

        next: () => {

          this.loadTickets();
          this.snackBar.open(
            'Ticket berhasil ditambahkan',
            'Tutup',
            {
              duration: 2500
            }
          );

        },

        error: err => {

          console.error(err);

          this.snackBar.open(
            'Gagal memindahkan ticket',
            'Tutup',
            {
              duration: 3000
            }
          );

        }

      });

    });

  }


  logout() {

    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);

  }


  get todoTickets() {

    return this.tickets.filter(x =>

      x.status.toLowerCase() === 'todo'

    );

  }

  get progressTickets() {

    return this.tickets.filter(x =>

      x.status.toLowerCase() === 'in-progress'

    );

  }

  get doneTickets() {

    return this.tickets.filter(x =>

      x.status.toLowerCase() === 'done'

    );

  }

  openEditDialog(ticket: Ticket): void {

    const dialogRef = this.dialog.open(TicketFormComponent, {
      width: '600px',
      data: ticket
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.ticketService
        .updateTicket(result.id, result)
        .subscribe({

          next: () => {

            this.loadTickets();
            this.snackBar.open(
              'Ticket berhasil diperbarui',
              'Tutup',
              {
                duration: 2500
              }
            );

          },

          error: err => {

            console.error(err);

            this.snackBar.open(

              'Terjadi kesalahan',

              'Tutup',

              {

                duration: 3000

              }

            );

          }

        });

    });

  }

  deleteTicket(ticket: Ticket): void {

    const confirmDelete = confirm(
      `Yakin ingin menghapus "${ticket.title}" ?`
    );

    if (!confirmDelete) {
      return;
    }

    this.ticketService.deleteTicket(ticket.id!).subscribe({

      next: () => {

        this.loadTickets();

        this.snackBar.open(
          'Ticket berhasil dihapus',
          'Tutup',
          {
            duration: 2500
          }
        );

      },

      error: err => {

        console.error(err);
        this.snackBar.open(
          'Gagal menghapus ticket',
          'Tutup',
          {
            duration: 3000
          }
        );

      }

    });

  }

  drop(event: CdkDragDrop<Ticket[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      return;

    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const ticket = event.container.data[event.currentIndex];

    ticket.status = event.container.id as any;
    ticket.updatedAt = new Date().toISOString();

    this.ticketService
      .updateTicket(ticket.id!, ticket)
      .subscribe(() => {

        this.loadTickets();

      });

  }

}