import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import {User} from '../user.model';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userProfileForm: FormGroup;
  submitted = false;
  user:User


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    this.userProfileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
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
  console.log("=====>>",this.user)
   }

  ngOnInit(): void { }
  get f(){
    return this.userProfileForm.controls;;
}

onSubmit() {
    this.submitted = true;

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

    this.userService.updateUserprofile(this.userProfileForm.value).subscribe(data => {
        if (data.token) {
            this.router.navigate(['index']);
        }
    }) ;
}

}

