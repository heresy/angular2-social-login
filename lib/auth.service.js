"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (provider) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            switch (provider) {
                case "google":
                    if (typeof (_this.gauth) == "undefined") {
                        _this.gauth = gapi.auth2.getAuthInstance();
                    }
                    if (!_this.gauth.isSignedIn.get()) {
                        _this.gauth.signIn().then(function () {
                            localStorage.setItem('_login_provider', 'google');
                            observer.next(_this._fetchGoogleUserDetails());
                            observer.complete();
                        });
                    }
                    else {
                        localStorage.setItem('_login_provider', 'google');
                        observer.next(_this._fetchGoogleUserDetails());
                        observer.complete();
                    }
                    break;
                case "facebook":
                    FB.getLoginStatus(function (response) {
                        if (response.status === "connected") {
                            FB.api('/me?fields=name,email,picture', function (res) {
                                if (!res || res.error) {
                                    observer.error(res.error);
                                }
                                else {
                                    var userDetails = {
                                        name: res.name,
                                        email: res.email,
                                        uid: res.id,
                                        provider: "facebook",
                                        image: res.picture.data.url,
                                        token: response.authResponse.accessToken
                                    };
                                    localStorage.setItem('_login_provider', 'facebook');
                                    observer.next(userDetails);
                                    observer.complete();
                                }
                            });
                        }
                        else {
                            FB.login(function (response) {
                                if (response.status === "connected") {
                                    FB.api('/me?fields=name,email,picture', function (res) {
                                        if (!res || res.error) {
                                            observer.error(res.error);
                                        }
                                        else {
                                            var userDetails = {
                                                name: res.name,
                                                email: res.email,
                                                uid: res.id,
                                                provider: "facebook",
                                                image: res.picture.data.url,
                                                token: response.authResponse.accessToken
                                            };
                                            localStorage.setItem('_login_provider', 'facebook');
                                            observer.next(userDetails);
                                            observer.complete();
                                        }
                                    });
                                }
                            }, { scope: 'email' });
                        }
                    });
                    break;
                case "linkedin":
                    IN.User.authorize(function () {
                        IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result(function (res) {
                            var userDetails = { name: res.firstName + " " + res.lastName, email: res.emailAddress, uid: res.id, provider: "linkedIN", image: res.pictureUrl };
                            localStorage.setItem('_login_provider', 'linkedin');
                            observer.next(userDetails);
                            observer.complete();
                        });
                    });
                    break;
            }
        });
    };
    AuthService.prototype.logout = function () {
        var provider = localStorage.getItem("_login_provider");
        return Observable_1.Observable.create(function (observer) {
            switch (provider) {
                case "google":
                    var gElement = document.getElementById("gSignout");
                    if (typeof (gElement) != 'undefined' && gElement != null) {
                        gElement.remove();
                    }
                    var d = document, gSignout, ref = d.getElementsByTagName('script')[0];
                    gSignout = d.createElement('script');
                    gSignout.src = "https://accounts.google.com/Logout";
                    gSignout.type = "text/javascript";
                    gSignout.id = "gSignout";
                    localStorage.removeItem('_login_provider');
                    observer.next(true);
                    observer.complete();
                    ref.parentNode.insertBefore(gSignout, ref);
                    break;
                case "facebook":
                    FB.logout(function (res) {
                        localStorage.removeItem('_login_provider');
                        observer.next(true);
                        observer.complete();
                    });
                    break;
                case "linkedin":
                    IN.User.logout(function () {
                        localStorage.removeItem('_login_provider');
                        observer.next(true);
                        observer.complete();
                    }, {});
                    break;
            }
        });
    };
    AuthService.prototype._fetchGoogleUserDetails = function () {
        var currentUser = this.gauth.currentUser.get();
        var profile = currentUser.getBasicProfile();
        var idToken = currentUser.getAuthResponse().id_token;
        return {
            token: idToken,
            uid: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            provider: "google"
        };
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map