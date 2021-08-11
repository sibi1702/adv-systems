import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

import { AlertService } from '../alert.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userProfileForm: FormGroup;
  submitted = false;
  user: User


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.userProfileForm = this.formBuilder.group({
      firstname: [null,[ Validators.required, Validators.minLength(3)]],
      lastname: [null,[ Validators.required, Validators.minLength(4)]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      bioDescription: [''],
      companyName: [''],
      jobTitle: [''],
      urlFacebook: [''],
      urlInstagram: [''],
      urlTwitter: [''],
      urlLinkedin: [''],
    });
    this.user = this.userService.userValue;
  }

  ngOnInit(): void {
    this.userProfileForm.patchValue(this.user);
   }

  get f() {
    return this.userProfileForm.controls;;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    // stop here if form is invalid
    if (this.userProfileForm.invalid) {
      return;
    }
    
    if (this.userProfileForm.value.bioDescription === "") {
      delete this.userProfileForm.value.bioDescription;
    }

    if (this.userProfileForm.value.companyName === "") {
      delete this.userProfileForm.value.companyName;
    }

    if (this.userProfileForm.value.companyName === "") {
      delete this.userProfileForm.value.companyName;
    }

    if (this.userProfileForm.value.jobTitle === "") {
      delete this.userProfileForm.value.jobTitle;
    }

    if (this.userProfileForm.value.urlFacebook === "") {
      delete this.userProfileForm.value.urlFacebook;
    }

    if (this.userProfileForm.value.urlInstagram === "") {
      delete this.userProfileForm.value.urlInstagram;
    }

    if (this.userProfileForm.value.urlTwitter === "") {
      delete this.userProfileForm.value.urlTwitter;
    }

    if (this.userProfileForm.value.urlLinkedin === "") {
      delete this.userProfileForm.value.urlLinkedin;
    }

    if (this.userProfileForm.value.email) {
      delete this.userProfileForm.value.email;
    }

    this.userProfileForm.value._id = this.user._id;

    this.userService.updateUserprofile(this.userProfileForm.value).subscribe({
      next : (data) => {
        const token = this.authService.getToken();
        this.userService.getCurrentUser(token).subscribe({
          next: (userData) => {
            this.userService.setUserDetail(userData);
            if (data._id) {
              this.alertService.success('User Profile updated successfully.');
            }
          },
          error: error => {
            this.alertService.error(error.error.errors.message);
          }
        })
      },
      error: error => {
          this.alertService.error(error.error.errors.message);
      }
  });
  }

}

