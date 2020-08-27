/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import {fromPromise} from "rxjs/internal-compatibility";
import {mergeMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isAuthenticated: boolean;
  constructor(public oktaAuth: OktaAuthService, private router: Router, private httpClient: HttpClient) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.oktaAuth.$authenticationState
      .pipe(
        mergeMap(() => fromPromise(this.oktaAuth.getIdToken()))
      )
      .subscribe(idToken => {
        console.log(idToken);
      });

  }
  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('isAuthenticated: ', this.isAuthenticated);
    const idToken = await this.oktaAuth.getIdToken();
    console.log('id_token: ', idToken);

    if (this.isAuthenticated) {
      const body = new URLSearchParams();
      body.set('', idToken);

      this.httpClient.post('https://local-catalog.dev.opensesame.com/fl/auth/token', {
        id_token: idToken
      })
        .subscribe(response => {
          console.log('drupal auth: ', response);
        });
    }

  }
  login() {
    this.oktaAuth.loginRedirect();
  }
  logout() {
    this.oktaAuth.logout('/');
  }
}
