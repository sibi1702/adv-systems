import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
        console.log(data)
        if (data.token) {
          this.authService.setSession(data);
          setTimeout(()=>{                           // <<<---using ()=> syntax
            this.router.navigate(['/']);
          }, 1500);
        } else {
          alert("Invalid Credential!")
        }
    }) ;
  }

  get f(){
    return this.loginForm.controls;;
  }

}
