import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';
import {UserService} from '../user.service';
import { AlertService } from '../alert.service';


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
              this.alertService.error(error.error.errors.message);
            }
          })
          
        }     
      },
      error: error => {
        this.alertService.error(error.error.errors.message);
      }
    }) ;
  }

  get f(){
    return this.loginForm.controls;;
  }

}
