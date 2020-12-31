import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {}

  submit(): void {
    this.httpClient.post('http://localhost:3001/api/users', {
      user: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      },
      group: environment.id
    }).subscribe(response => console.log('response', response));
  }
}
