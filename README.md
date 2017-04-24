# angular2-social-login
Simple client side social authentication for Angular2 application based on our previous angular1's angularjs-social-login plugin.

Supported sites:
- Google
- Facebook
- LinkedIN

## Getting started
### Installation

#### via npm

```shell
npm install angular2-social-login --save
```
### Adding angular2-social-login to your project
Add `map` for **`angular2-social-login`** in your `systemjs.config`
```javascript
'angular2-social-login': 'node_modules/angular2-social-login/dist/bundles/angular2-social-login.min.js'
```
### Main module configuration
```javascript
import { NgModule }      from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2SocialLoginModule } from "angular2-social-login";

let providers = {
    "google": {
      "clientId": "GOOGLE_CLIENT_ID"
    },
    "linkedin": {
      "clientId": "LINKEDIN_CLIENT_ID"
    },
    "facebook": {
      "clientId": "FACEBOOK_CLIENT_ID",
      "apiVersion": "<version>" //like v2.4
    }
  };

@NgModule({
  imports: [ 
              BrowserModule,
              Angular2SocialLoginModule
          ],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  constructor(){}
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
```
### Component configuration for `login()` and `logout()`:
For `login(provider: string)` provider is required it should be anyone(case-sensitive) "facebook", "google", "linkedin" .
```javascript
...
import { AuthService } from "angular2-social-login";
...
@Component({
    ...
})
export class AppComponent implements OnDestroy {
  ...
  constructor(public _auth: AuthService){ }
  
  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  //user data
                  //name, image, uid, provider, uid, email, token (returns tokenId for google, accessToken for Facebook, no token for linkedIn)
                }
    )
  }

  logout(){
    this._auth.logout().subscribe(
      (data)=>{//return a boolean value.}
    )
  }

  ...

}
```
For example please visit https://github.com/heresy/angular2-social-login-example
