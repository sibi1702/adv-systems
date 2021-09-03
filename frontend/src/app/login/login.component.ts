import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../sevice/auth';
import {UserService} from '../sevice/user';
import { AlertService } from '../sevice/alert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  viewPassword: boolean;

  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private userService:UserService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required]
    });
  }

  toggleViewPassword() {
    this.viewPassword = !this.viewPassword;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (data) => {
        if (data.token) {
          this.userService.getCurrentUser(data.token).subscribe({
            next: (userData) => {
              this.authService.setSession(data);
              this.userService.setUserDetail(userData);
              this.alertService.success("Login successfull! Please wait.");
              setTimeout(()=>{
                this.router.navigate(['/']);
              }, 1500);
            },
            error: error => {
              if (error.error && error.error.errors && error.error.errors.message) {
                this.alertService.error(error.error.errors.message);
              } else if (error.message) {
                this.alertService.error(error.message);
              } else {
                this.alertService.error('Could not connect to the server. Please try again later.');
              }
            }
          })

        }
      },
      error: error => {
        if (error.error && error.error.errors && error.error.errors.message) {
          this.alertService.error(error.error.errors.message);
        } else if (error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error('Could not connect to the server. Please try again later.');
        }
      }
    }) ;
  }

  get f(){
    return this.loginForm.controls;;
  }

}
