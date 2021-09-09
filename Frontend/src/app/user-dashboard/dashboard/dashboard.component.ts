import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { DropDownDataService } from 'src/app/shared/services/drop-down-data.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import * as _ from 'lodash';
import { ToasterService } from 'src/app/shared/services/toaster.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  registrationForm: FormGroup;
  foodType: any;
  selectedFood: any;
  selectedCollege: any;
  colleges: any;
  total: number = 400;
  show = false;

  constructor(private router: Router,
    private localStorage: LocalStorageService,
    private fb: FormBuilder,
    private dropdown: DropDownDataService,
    private dashboard: DashboardService,
    private toaster: ToasterService,) { }

  async ngOnInit(): Promise<void> {

    this.registrationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{1,15}$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{1,15}$')]),
      contact: new FormControl('', [Validators.required, Validators.pattern('^[+]+[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{0,8}$')]),
      total: new FormControl(400, [])
    });

    await this.getFoodTypeDropdown();
    await this.getColleges();
  }
  async getFoodTypeDropdown() {
    (await this.dropdown.getFoodType()).subscribe((data) => {
      const { foodType } = data;
      this.foodType = foodType;
    });
  }

  async getColleges() {
    (await this.dropdown.getColleges()).subscribe((data) => {
      const { colleges } = data;
      this.colleges = colleges;
    });
  }

  updateFood(e){
    this.selectedFood = e.target.value;
  }
  updateCollege(e) {
    this.selectedCollege = e.target.value;
  }
  switchChange(e) {
    this.show = !this.show;
    const number = Number(e.target.value)
    this.total =  this.show ? this.total + number : 400;
  }
  async register() {
    
    const { email, firstName, lastName, contact } = this.registrationForm.value;

    const userDetails = {
      email,
      firstName,
      lastName,
      contact,
      total: this.total,
      foodType: this.selectedCollege,
      college: this.selectedCollege
    };

     (await this.dashboard.registerParticipant(userDetails)).subscribe((user) => {

      console.log("user", user)
      const { data } = user;
      
      console.log("data",data)

      if (_.isNull(data)) {
        const { meta: { message } } = user;
        this.toaster.showError(message);
      } else {
        const { message } = user;
        this.toaster.showSuccess(message);
        // this.registrationForm.reset();
        // this.selectedCollege = "Select College";
        // this.selectedFood = "Select Food"
      }

    }, err => {
        const { error : { meta : { message } } } = err;
        this.toaster.showError(message);
    }) 


  }
}
