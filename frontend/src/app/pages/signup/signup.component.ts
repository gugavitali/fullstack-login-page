import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SiginupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent, ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SiginupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => this.toastrService.success("Registro feito com sucesso"),
      error: () => this.toastrService.error("Erro inesperado! tente novamente mais tarde")
    })
  }

  navigate() {
    this.router.navigate(["login"])
  }
}
