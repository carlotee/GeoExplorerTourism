import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  iniciarSesion() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor, completa los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (respuesta) => {
        this.isLoading = false;
        
        if (respuesta && respuesta.token) {
          localStorage.setItem('token', respuesta.token);
        }

        console.log('Login exitoso, redirigiendo...');
        this.router.navigate(['/dashboard']); 
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error de autenticación:', error);
        
        this.errorMessage = error.error?.message || 'Error al conectar con la base de datos o credenciales incorrectas.';
      }
    });
  }
}