import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/model/user-dto';
import { UserGetDTO } from 'src/app/model/user-get-dto';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{
  user!:UserGetDTO;
  userUpdate!:UserDTO;
  updateForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private tokenService:TokenService, private router:Router) { }
  ngOnInit(): void {
    this.createForms();
    this.getMe();
  }
  /**
   * update
   */
  public update() {
    this.userUpdate = this.updateForm.value;
    this.userService.updateMe(this.userUpdate).subscribe({
      next: data => {
        this.getMe();
      },
      error: error => {
        console.log(`Error`);
      }
    });
  }
  /**
   * getMe
   */
  public getMe() {
    this.userService.getMe().subscribe({
      next: data => {
        this.user = data.data.user;
      },
      error: error => {
        console.log("error");
      }
    });
  }
  private createForms() {
    this.updateForm = this.formBuilder.group({
      name: new FormControl("", []),
      email: new FormControl("", []),
      photo: new FormControl("", [])
    });
  }
}
