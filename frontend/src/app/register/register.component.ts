import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: SocialAuthService
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required, Validators.minLength(3)],
            lastname: ['', Validators.required, Validators.minLength(3)],
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required, Validators.minLength(6)],
            confirmPassword: ['', Validators.required],
            acceptTerms: ['', Validators.requiredTrue]
        });
    }
    
    get f(){
        return this.registerForm.controls;;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }
    
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
            console.log(userData);
        });
    }
  
    signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
          console.log(userData);
      });
    }
  
    signOut(): void {
      this.authService.signOut();
    }

    

}
