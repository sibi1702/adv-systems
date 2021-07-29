
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  postForm: FormGroup;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) { 
     this.postForm = this.formBuilder.group({
      postDescription: ['',Validators.required,Validators.maxLength(200)],
      scheduledDateTime: ['',Validators.required],
      postInFacebook: [''],
      postInInstagram: [''],
      postInTwitter: [''],
      postInLinkedin: [''],

  }); }

  ngOnInit(): void {  
  }
  
get f(){
  return this.postForm.controls;;
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.postForm.invalid) {
      return;
  }
const newScheduledDateTime = new Date(this.postForm.value.scheduledDateTime);

if (this.postForm.value.postInFacebook==="") {
  this.postForm.value.postInFacebook=false;
}
if (this.postForm.value.postInInstagram==="") {
  this.postForm.value.postInInstagram=false;
}
if (this.postForm.value.postInTwitter==="") {
  this.postForm.value.postInTwitter=false;
}
if (this.postForm.value.postInLinkedin==="") {
  this.postForm.value.postInLinkedin=false;
}

console.log(this.postForm.value);

this.postForm.value.scheduledDateTime = newScheduledDateTime.getTime();
  this.postService.add(this.postForm.value).subscribe(data => {
      if (data.token) {
          this.router.navigate(['index']);
      }
  }) ;
 }

}
