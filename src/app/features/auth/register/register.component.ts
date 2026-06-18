import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  hide=true;

  form!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private snack:MatSnackBar
  ){

    this.form=this.fb.group({

      name:['',Validators.required],

      email:['',[Validators.required,Validators.email]],

      password:['',Validators.required],

      confirm:['',Validators.required]

    });

  }

  register(){

    if(this.form.invalid){

      this.form.markAllAsTouched();

      return;

    }

    if(this.form.value.password!=this.form.value.confirm){

      this.snack.open(
        'Password tidak sama',
        'OK',
        {duration:2500}
      );

      return;

    }

    this.http.post(
      'http://localhost:3000/users',
      {

        name:this.form.value.name,

        email:this.form.value.email,

        password:this.form.value.password,

        avatar:this.form.value.name.substring(0,2).toUpperCase(),

        role:'member'

      }

    ).subscribe({

      next:()=>{

        this.snack.open(
          'Register berhasil',
          'OK',
          {duration:2000}
        );

        this.router.navigate(['/login']);

      }

    });

  }

}