import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/model/alert';
import { SessionDTO } from 'src/app/model/session-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  sesionDto!:SessionDTO;
  loginForm!:FormGroup;
  alert!: Alert;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private tokenService:TokenService){ }
  /**
   * login
   */
  public login() {
    const obj = this;
    this.sesionDto = this.loginForm.value;
    this.authService.login(this.sesionDto).subscribe({
      next: data => {
        this.tokenService.login(data.data.token);
      },
      error: error => {
        obj.alert = new Alert(error.error.message, 'Error');
        console.log(error);
      }
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
}