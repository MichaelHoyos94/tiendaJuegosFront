import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/model/user-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Alert } from 'src/app/model/alert';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signUpForm!: FormGroup;
  user!: UserDTO;
  selectedPhoto!: File;
  alert!: Alert;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private imageService:ImageService) {}
  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      passwordConfirm: new FormControl("", [Validators.required]),
      photo: [null]
    });
  }
  private uploadPhoto(): void {
    if (this.selectedPhoto){
      this.imageService.uploadImage(this.selectedPhoto).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
  /**
   * signup
   */
  public signup() {
    this.user = this.signUpForm.value;
    const obj = this;
    this.authService.signup(this.user).subscribe({
      next: data=> {
        obj.alert = new Alert("Your account has been created.", data.status);
        this.uploadPhoto();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedPhoto = event.target.files[0];
      this.signUpForm.patchValue({
          photo: this.selectedPhoto.name
      });
      this.signUpForm.get('photo')?.updateValueAndValidity();
    }
  }

  public areSame():boolean {
    return this.signUpForm.value.password === this.signUpForm.value.passwordConfirm;
  }
}