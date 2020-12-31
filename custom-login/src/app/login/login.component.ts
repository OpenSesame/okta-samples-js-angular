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

import {Component, OnDestroy, OnInit} from "@angular/core";
import { OktaAuthService } from "@okta/okta-angular";
import * as OktaSignIn from "@okta/okta-signin-widget";
import sampleConfig from "../app.config";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  signIn: any;
  constructor(public oktaAuth: OktaAuthService, router: Router) {
    console.log('environment', environment);
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: sampleConfig.oidc.issuer.split("/oauth2")[0],
      clientId: sampleConfig.oidc.clientId,
      redirectUri: sampleConfig.oidc.redirectUri,
      logo: "/assets/angular.svg",
      i18n: {
        en: {
          "primaryauth.title": "Sign in to Angular & Company",
        },
      },
      authParams: {
        issuer: sampleConfig.oidc.issuer,
        pkce: true
      },
      // idps: [
      //   {
      //     type: "GOOGLE",
      //     id: "0oavt35l5i27GsgCf0h7",
      //   },
      // ],
      registration: {
        click: function() {
          router.navigate(['/register']);
        }
      },
      // self serve registration
      // registration: {
      //   parseSchema: function(schema, onSuccess, onFailure) {
      //     console.log("parseSchema", schema);
      //     onSuccess(schema);
      //   },
      //   preSubmit: function (postData, onSuccess, onFailure) {
      //     console.log(environment);
      //     postData.pocContext = environment.id;
      //     console.log("preSubmit", postData);
      //     onSuccess(postData);
      //   },
      //   postSubmit: function (response, onSuccess, onFailure) {
      //     console.log("postSubmit", response);
      //     onSuccess(response);
      //   }
      // },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
        registration: true // REQUIRED
      }

    });
  }

  ngOnInit() {
    this.signIn
      .showSignInToGetTokens({
        el: "#sign-in-widget",
        scopes: sampleConfig.oidc.scopes,
      })
      .then((tokens) => {
        console.log("tokens", tokens);

        console.log(this.oktaAuth.getOktaConfig());
        console.log(this.oktaAuth.authStateManager.getAuthState());
        console.log(this.oktaAuth.getIdToken());

        // When navigating to a protected route, the route path will be saved as the `originalUri`
        // If no `originalUri` has been saved, then redirect back to the app root
        const originalUri = this.oktaAuth.getOriginalUri();
        if (originalUri === DEFAULT_ORIGINAL_URI) {
          this.oktaAuth.setOriginalUri("/");
        }

        // Remove the widget
        this.signIn.remove();

        // In this flow the redirect to Okta occurs in a hidden iframe
        this.oktaAuth.handleLoginRedirect(tokens);
      })
      .catch((err) => {
        // Typically due to misconfiguration
        throw err;
      });
  }

  ngOnDestroy() {
    this.signIn.remove();
  }
}
