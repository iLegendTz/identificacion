import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country, State, City, IState, ICity, ICountry } from 'country-state-city';

import { CustomValidators } from '../../../utils/validators';

import genders from '../../../../assets/genders.json';
import bloodTypes from '../../../../assets/bloodTypes.json';
import maritalStatus from '../../../../assets/maritalStatus.json';
import supervisors from '../../../../assets/supervisors.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  today = new Date().toISOString().split("T")[0];
  regexNames = new RegExp('^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$');
  numberWithDecimals = new RegExp('^[1-9][0-9]?(\.[0-9]{1,2})?$');

  lstGenders = genders;
  lstBloodTypes = bloodTypes;
  lstMaritalStatus = maritalStatus;
  lstSupervisors = supervisors;

  countries: ICountry[] = Country.getAllCountries();
  provinces: IState[] = [];
  localities: ICity[] = [];


  registerForm: FormGroup = new FormGroup({
    fatherLastName: new FormControl(null, [Validators.required, Validators.pattern(this.regexNames)]),
    motherLastName: new FormControl(null, [Validators.pattern(this.regexNames)]),
    name: new FormControl(null, [Validators.required, Validators.pattern(this.regexNames)]),
    gender: new FormControl(null, [Validators.required, Validators.nullValidator]),
    birthday: new FormControl(null, [Validators.required, CustomValidators.maxDateToday]),
    country: new FormControl(null, [Validators.required]),
    province: new FormControl(null, [Validators.required]),
    locality: new FormControl(null, [Validators.required]),
    weight: new FormControl(null, [Validators.pattern(this.numberWithDecimals)]),
    height: new FormControl(null, [Validators.pattern(this.numberWithDecimals)]),
    bloodType: new FormControl(null),
    nacionality: new FormControl(null),
    maritalStatus: new FormControl(null),
    licenceNumber: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
    passportNumber: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
    email: new FormControl(null, [Validators.email]),
    supervisor: new FormControl(null),
  });

  onCountryChange() {
    this.registerForm.get('province')?.setValue(null);
    this.registerForm.get('locality')?.setValue(null);

    this.provinces = State.getStatesOfCountry(this.registerForm.get('country')?.value);
  }

  onProvinceChange() {
    this.registerForm.get('locality')?.setValue(null);
    this.localities = City.getCitiesOfState(this.registerForm.get('country')?.value, this.registerForm.get('province')?.value)
  }

  onSubmit() {
  }
}
