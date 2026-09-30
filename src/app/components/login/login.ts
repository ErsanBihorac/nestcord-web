import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { email, form, minLength, required, FormField } from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email adress is required' });
    email(schemaPath.email, { message: 'Email must be valid' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, {
      message: 'Password must contain a minimum of 8 characters',
    });
  });

  handleGoogleClick() {
    this.authService.loginWithGoogle();
    console.log('google login...');
  }

  handleGithubClick() {
    this.authService.loginWithGithub();
    console.log('github login...');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const user = this.loginModel();
    this.authService.loginWithPassword(user.email, user.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }
}
