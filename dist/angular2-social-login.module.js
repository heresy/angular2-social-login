var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
var Angular2SocialLoginModule = /** @class */ (function () {
    function Angular2SocialLoginModule() {
    }
    Angular2SocialLoginModule.loadProvidersScripts = function (config) {
        var loadProvidersScripts = {
            google: function (info) {
                return new Promise(function (resolve, reject) {
                    var d = document, gJs, ref = d.getElementsByTagName('script')[0];
                    gJs = d.createElement('script');
                    gJs.async = true;
                    gJs.src = "//apis.google.com/js/platform.js";
                    gJs.onload = function () {
                        gapi.load('auth2', function () {
                            gapi.auth2.init({
                                client_id: info["clientId"],
                                scope: 'email'
                            });
                            resolve(true);
                        });
                    };
                    ref.parentNode.insertBefore(gJs, ref);
                });
            },
            linkedin: function (info) {
                return new Promise(function (resolve, reject) {
                    var lIN, d = document, ref = d.getElementsByTagName('script')[0];
                    lIN = d.createElement('script');
                    lIN.async = false;
                    lIN.src = "//platform.linkedin.com/in.js";
                    lIN.text = ("api_key: " + info["clientId"]).replace("\"", "");
                    ref.parentNode.insertBefore(lIN, ref);
                    resolve(true);
                });
            },
            facebook: function (info) {
                return new Promise(function (resolve, reject) {
                    var d = document, fbJs, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    fbJs = d.createElement('script');
                    fbJs.id = id;
                    fbJs.async = true;
                    fbJs.src = "//connect.facebook.net/en_US/sdk.js";
                    fbJs.onload = function () {
                        FB.init({
                            appId: info["clientId"],
                            status: true,
                            cookie: true,
                            xfbml: true,
                            version: info["apiVersion"]
                        });
                        resolve(true);
                    };
                    ref.parentNode.insertBefore(fbJs, ref);
                });
            }
        };
        var promises = [];
        Object.keys(config).forEach(function (provider) {
            promises.push(loadProvidersScripts[provider](config[provider]));
        });
        return Promise.all(promises);
    };
    Angular2SocialLoginModule = __decorate([
        NgModule({
            providers: [AuthService]
        })
    ], Angular2SocialLoginModule);
    return Angular2SocialLoginModule;
}());
export { Angular2SocialLoginModule };
//# sourceMappingURL=angular2-social-login.module.js.map