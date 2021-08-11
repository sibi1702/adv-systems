
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../post.service';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  postId: string = '';
  postForm: FormGroup;
  submitted = false;
  user: User

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService

  ) {
    
    this.postForm = this.formBuilder.group({
      postDescription: ['', [Validators.required, Validators.maxLength(200)]],
      scheduledDateTime: ['', [Validators.required]],
      postInFacebook: [''],
      postInInstagram: [''],
      postInTwitter: [''],
      postInLinkedin: [''],

    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['postId']) {
        this.postId = params['postId'];
        this.postService.getPostById(this.postId).subscribe({
          next: (data) => {
            if (data._id) {
              let newDate = new Date(data.scheduledDateTime).toLocaleString("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }).replace(" ", "T")
              data.scheduledDateTime = newDate;
              this.postForm.patchValue(data);
            }
          },
          error: error => {
            this.alertService.error(error.error.errors.message);
          }
        });
        
      }
    });
    
    this.user = this.userService.userValue;
  }

  get f() {
    return this.postForm.controls;;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }
    const newScheduledDateTime = new Date(this.postForm.value.scheduledDateTime);
    if (this.postForm.value.postInFacebook === "") {
      this.postForm.value.postInFacebook = false;
    }
    if (this.postForm.value.postInInstagram === "") {
      this.postForm.value.postInInstagram = false;
    }
    if (this.postForm.value.postInTwitter === "") {
      this.postForm.value.postInTwitter = false;
    }
    if (this.postForm.value.postInLinkedin === "") {
      this.postForm.value.postInLinkedin = false;
    }


    this.postForm.value.scheduledDateTime = newScheduledDateTime.getTime();
    if (this.postId === ''){
      this.addPost();
    } else {
      this.updatePost();
    }    
  }

  private addPost() {
    this.postService.add(this.postForm.value).subscribe({
      next: (data) => {
        if (data) {
          this.alertService.success('Post scheduled succesfully.');
          setTimeout(() => {
            this.router.navigate(['post/list']);
          },2000)
        }
      },
      error: error => {
        this.alertService.error(error.error.errors.message);
      }
    });
  }

  private updatePost() {
    this.postService.update(this.postForm.value, this.postId).subscribe({
      next: (data) => {
        if (data) {
          this.alertService.success('Post updated succesfully.');
          setTimeout(() => {
            this.router.navigate(['post/list']);
          },2000)
        }
      },
      error: error => {
        this.alertService.error(error.error.errors.message);
      }
    });
  }
}
