import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { LocalStorageService } from '../../shared/services/localstorage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  accountList: any = [];
  returnUrl: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[!@#$%^&*])(?=[^0-9]*[0-9]).{8,}')])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/register';
  }

 async login() {
    const { email, password } = this.loginForm.value;
    const userDetails = {
      email,
      password
    }
    ; (await this.auth.login(userDetails)).subscribe((user) => {

      console.log("user", user);
      // this.router.navigate(['/dashboard/register']);
      console.log("url", this.returnUrl)
      this.router.navigateByUrl(this.returnUrl);
      this.localStorage.storeData('SeesionUser', user.token);

    }, err => {

      const { error: { meta: { message } } } = err;
      
      if ( err.status === 404 || err.status === 401) {
        this.toaster.showError(message);
        this.loginForm.reset();
        this.router.navigateByUrl('login');
      } 
    });

  }

  register() {
    this.router.navigateByUrl('/signup');
  }

}
