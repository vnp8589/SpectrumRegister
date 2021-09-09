import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MustMatch } from '../../shared/Validators/passwordMatchValidator';
import * as _ from 'lodash';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  accountList: any = [];
  userDetailForm: FormGroup;

  constructor(private localStorage: LocalStorageService,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.userDetailForm = this.fb.group({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(11)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[!@#$%^&*])(?=[^0-9]*[0-9]).{8,}')])),
      retypePassword: new FormControl('', [Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[!@#$%^&*])(?=[^0-9]*[0-9]).{8,}')])
    }, {
      validator: MustMatch('password', 'retypePassword')
    });
  }

  get f() {
    return this.userDetailForm.controls;
  }

  async createAccount() {
    const { email, userName, password, retypePassword } = this.userDetailForm.value;

    const accountDetails = {
      email,
      userName,
      password,
    }

      ; (await this.auth.registerUser(accountDetails)).subscribe((user) => {

        const { data } = user;

        if (_.isNull(data)) {
          const { meta: { message } } = user;
          this.toaster.showError(message);
        } else {
          const { message } = user;
          this.toaster.showSuccess(message);
          this.userDetailForm.reset();
          this.router.navigateByUrl('login');
        }

      }, err => {
        console.log(err)

        const { error : { meta : { message } } } = err;

        this.toaster.showError(message);
      })
  }


}
