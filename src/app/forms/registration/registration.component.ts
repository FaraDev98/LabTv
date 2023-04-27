import { Component, Directive, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { RegisterDto } from '../../models/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  model = new RegisterDto();
  form: FormGroup;

  // errori regex nome
  errorRegexNome0?: string;
  errorRegexNome1?: string;

  // errori regex email
  errorRegexEmail0?: string;

  // errori regex password
  errorRegexPassword0?: string;
  errorRegexPassword1?: string;
  errorRegexPassword2?: string;
  errorRegexPassword3?: string;

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      nome: new FormControl("", [Validators.required, this.regexTestValidator([/\D$/, /^.{2,30}$/], "nome")]),
      email: new FormControl(null, [Validators.required, this.regexTestValidator([/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i], "email")]),
      password: new FormControl(null, [Validators.required, this.regexTestValidator([/^[a-zA-Z0-9 <>(),;:@]{8,16}$/, /[A-Z]{1}/, /[a-z]{1}/, /[0-9]{1}/], "password")]),
      ripetiPassword: new FormControl(null, [Validators.required, this.comparisonValidator()]),
      privacy: new FormControl(null, Validators.requiredTrue)
    });
  }
  // constructor(public auth: AuthService, private router: Router) { }

  register() {

    this.model = {
      nome: this.form.get('nome')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('email')?.value
    }

    this.auth.register(this.model)
      .subscribe(u => {
        this.model = new RegisterDto();
        window.location.reload();
      })
  }

  regexTestValidator(RegExp: RegExp[], field: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      this.errorRegexNome0 = "";
      this.errorRegexNome1 = "";
      this.errorRegexEmail0 = "";
      this.errorRegexPassword0 = "";
      this.errorRegexPassword1 = "";
      this.errorRegexPassword2 = "";
      this.errorRegexPassword3 = "";

      for (let i = 0; i < RegExp.length; i++) {
        if (control.value && !control.value.toString().match(RegExp[i])) {
          switch (i) {
            case 0:
              switch (field) {
                case "nome":
                  this.errorRegexNome0 = "può contenere solo caratteri alfabetici";
                  break;
                case "email":
                  this.errorRegexEmail0 = "email non valida";
                  break;
                case "password":
                  this.errorRegexPassword0 = "numero caratteri errato (min 8 e max 16)";
                  break;
              }
              break;
            case 1:
              switch (field) {
                case "nome":
                  this.errorRegexNome1 = "numero caratteri errato (min 2 e max 30)";
                  break;
                case "password":
                  this.errorRegexPassword1 = "La password deve contenere almeno una lettera maiuscola";
                  break;
              }
              break;
            case 2:
              switch (field) {
                case "password":
                  this.errorRegexPassword2 = "la password deve contenere almeno una lettera minuscola";
                  break;
              }
              break;
            case 3:
              switch (field) {
                case "password":
                  this.errorRegexPassword3 = "la password deve contenere almeno un numero";
                  break;
              }
              break;
          }
          return { regex: true };
        }
      }
      return null;
    }
  };

  comparisonValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.toString() != this.form.get('password')?.value) {
        return { notEquals: true };
      }
      return null;
    }
  }
}
