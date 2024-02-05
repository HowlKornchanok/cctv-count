import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/guards/auth.service';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        AngularSvgIconModule,
        NgClass,
        NgIf,
        
    ],
    providers:[AuthService]
})
export class SignInComponent  {
  form!: FormGroup;
  submitted = false;
  passwordTextType = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async onSubmit() {
    const { user, password } = this.form.value;
  
    // Your authentication logic
    const loginSuccess = await this.authService.login(user, password);
  
    if (loginSuccess) {
      // If login is successful, navigate to the dashboard or another protected route
      console.log('SignInComponent - Login successful. Navigating to dashboard.');
      // Authentication status is updated here, but AuthGuard has already checked it
      this.router.navigate(['dashboard']);
    } else {
      // Handle failed login (e.g., show an error message)
      console.error('SignInComponent - Authentication failed');
    }
  }
}
