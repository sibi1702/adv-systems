import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../sevice/user';
import {AuthService} from '../sevice/auth';
import { AlertService } from '../sevice/alert';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  
  forgotpasswordForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService:AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
    });
  }

 
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.forgotpasswordForm.invalid) {
        return;
    }

  }

  get f(){
    return this.forgotpasswordForm.controls;;
  }

}
