import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Commented for Associate's reference.
  // registrationForm = new FormGroup({
  //   userName : new FormControl('John'),
  //   password : new FormControl(''),
  //   confirmPassword : new FormControl(''),
  //   address : new FormGroup({
  //     city : new FormControl(''),
  //     state : new FormControl(''),
  //     postalCode : new FormControl('')
  //   })
  // });

  get userName() {
    return this.registrationForm.get('userName');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(private fb: FormBuilder) {}
  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3),
                    forbiddenNameValidator(/admin/)]],
    password: ['',[forbiddenNameValidator(/password/)]],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
  setValueToLoadApiData() {
    this.registrationForm.setValue({
      userName : 'Bruce',
      password : 'test',
      confirmPassword : 'test',
      address : {
        city : 'City',
        state : 'State',
        postalCode : '123456'
      }
    });
  }

  patchValueToLoadApiData() {
    this.registrationForm.patchValue({
      userName : 'Bruce',
      password : 'test',
      confirmPassword : 'test'
    });
  }
}
