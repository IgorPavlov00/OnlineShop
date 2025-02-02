import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  signUpError!: string;
  signInError!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private toast: ToastrService) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signUp(): void {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  }

  signIn(): void {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  }

  onSignUpSubmit(): void {
    if (this.signUpForm.valid) {
      const success = this.authService.signUp(this.signUpForm.value);
      if (!success) {
        this.signUpError = 'User already exists.';
        this.toast.warning('User already exists!');
      } else {
        this.toast.success('User registered successfully!');
      }
    }
  }

  onSignInSubmit(): void {
    if (this.signInForm.valid) {
      console.log('Form Values:', this.signInForm.value);  // Debugging line
      const success = this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
      if (!success) {
        this.signInError = 'Invalid email or password.';
        this.toast.error('Invalid email or password!');
      }
    }
  }

  preventNavigation(event: Event): void {
    event.preventDefault();
  }
}
