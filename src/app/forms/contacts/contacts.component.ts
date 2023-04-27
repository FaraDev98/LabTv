import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  form: FormGroup;

  // errori regex nome
  errorRegexNome0?: string;
  errorRegexNome1?: string;

  // errori regex cognome
  errorRegexCognome0?: string;
  errorRegexCognome1?: string;

  // errori regex email
  errorRegexEmail0?: string;

  // errori regex telefono
  errorRegexTelefono0?: string;

  // errori regex messaggio
  errorRegexMessaggio0?: string;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: new FormControl("", [Validators.required, this.regexTestValidator([/\D$/, /^.{2,30}$/], "nome")]),
      cognome: new FormControl(null, [Validators.required, this.regexTestValidator([/\D$/, /^.{2,30}$/], "cognome")]),
      email: new FormControl(null, [Validators.required, this.regexTestValidator([/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i], "email")]),
      telefono: new FormControl(null, [Validators.required, this.regexTestValidator([/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im], "telefono")]),
      messaggio: new FormControl(null, [Validators.required, this.regexTestValidator([/^.{2,30}$/], "messaggio")]),
      privacy: new FormControl(null, Validators.requiredTrue)
    });


  }


  onSubmit() {
    window.location.reload();
  }

  regexTestValidator(RegExp: RegExp[], field: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      this.errorRegexNome0 = "";
      this.errorRegexNome1 = "";
      this.errorRegexCognome0 = "";
      this.errorRegexCognome1 = "";
      this.errorRegexEmail0 = "";
      this.errorRegexTelefono0 = "";
      this.errorRegexMessaggio0 = "";

      for (let i = 0; i < RegExp.length; i++) {
        if (control.value && !control.value.toString().match(RegExp[i])) {
          switch (i) {
            case 0:
              switch (field) {
                case "nome":
                  this.errorRegexNome0 = "può contenere solo caratteri alfabetici";
                  break;
                case "cognome":
                  this.errorRegexCognome0 = "può contenere solo caratteri alfabetici";
                  break;
                case "email":
                  this.errorRegexEmail0 = "email non valida";
                  break;
                case "telefono":
                  this.errorRegexTelefono0 = "numero di telefono non valido";
                  break;
                case "messaggio":
                  this.errorRegexMessaggio0 = "numero caratteri errato (min 2 e max 500)";
                  break;
              }
              break;
            case 1:
              switch (field) {
                case "nome":
                  this.errorRegexNome1 = "numero caratteri errato (min 2 e max 30)";
                  break;
                case "cognome":
                  this.errorRegexCognome1 = "numero caratteri errato (min 2 e max 30)";
                  break;
              }
              break;
            default:
              break;
          }
          return { regex: true };
        }
      }
      return null;
    }
  };

}


