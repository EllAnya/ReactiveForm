import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, Country } from 'src/app/app.model';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vezba1';

  registerForm: FormGroup;
  newUser = new User();

  countryList: Country[];

  constructor(
    private _formBuilder: FormBuilder, private _appService: ServiceService
  ) { 
    // Иницијализација на форма со formBuilder
    this.registerForm = this._formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      dob: new FormControl(''),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      zip_code: new FormControl(''),
      gender: new FormControl('', Validators.required),
      avatar: new FormControl(''),
      terms: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    this._appService.getCountry().subscribe(
      (country: Country[]) => {
        this.countryList = country;
      }
    );
  }

  saveForm(): void {
    this.newUser.first_name = this.registerForm.get('first_name').value;
    this.newUser.last_name = this.registerForm.get('last_name').value;
    this.newUser.email = this.registerForm.get('email').value;
    this.newUser.phone = String(this.registerForm.get('phone').value);
    this.newUser.dob = this.registerForm.get('dob').value;
    this.newUser.country = this.registerForm.get('country').value;
    this.newUser.city = this.registerForm.get('city').value;
    this.newUser.street = this.registerForm.get('street').value;
    this.newUser.zip_code = String(this.registerForm.get('zip_code').value);
    this.newUser.gender = this.registerForm.get('gender').value;
    this.newUser.avatar = this.registerForm.get('avatar').value;
    
    this._appService.createUser(this.newUser).subscribe(data=> {
    alert("Registration is successfull");
    }),error => {
    alert('Wrong Credentials!'); 
    };
    
  }

}