import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../mustmatch.validator';

import {AuthService} from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	passwordFieldTextType: boolean;
    confrimPasswordFieldTextType: boolean;
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: SocialAuthService,
        private userService: UserService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstname: [null,[ Validators.required, Validators.minLength(3)]],
            lastname: [null,[ Validators.required, Validators.minLength(4)]],
            email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: [null,[ Validators.required, Validators.minLength(6)]],
            confirmPassword: [null,[ Validators.required]],
            acceptTerms: [null,[ Validators.requiredTrue]]
        },{
            validator: MustMatch('password', 'confirmPassword')
        });
    }
    
    showPassword() {
        this.passwordFieldTextType = !this.passwordFieldTextType;
    }

    showConfrimPassword() {
        this.confrimPasswordFieldTextType = !this.confrimPasswordFieldTextType;
    }

    get f(){
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        delete this.registerForm.value.acceptTerms;
        delete this.registerForm.value.confirmPassword;

        this.userService.addUser(this.registerForm.value).subscribe({
            next : (data) => {
                if (data.token) {
                    this.alertService.success('Registration successfull! Please Login.');
                    //this.router.navigate(['login']);
                }
            },
            error: error => {
                this.alertService.error(error.error.errors.message);
            }
        }) ;
    }
    
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
            this.router.navigate(['index']);
        });
    }
  
    signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
        this.router.navigate(['index']);
      });
    }
  
    signOut(): void {
      this.authService.signOut();
    }

}
