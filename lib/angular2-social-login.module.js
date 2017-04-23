"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var Angular2SocialLoginModule = Angular2SocialLoginModule_1 = (function () {
    function Angular2SocialLoginModule() {
    }
    Angular2SocialLoginModule.loadProvidersScripts = function (config) {
        var loadProvidersScripts = {
            google: function (info) {
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
                    });
                };
                ref.parentNode.insertBefore(gJs, ref);
            },
            linkedin: function (info) {
                var lIN, d = document, ref = d.getElementsByTagName('script')[0];
                lIN = d.createElement('script');
                lIN.async = false;
                lIN.src = "//platform.linkedin.com/in.js";
                lIN.text = ("api_key: " + info["clientId"]).replace("\"", "");
                ref.parentNode.insertBefore(lIN, ref);
            },
            facebook: function (info) {
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
                };
                ref.parentNode.insertBefore(fbJs, ref);
            }
        };
        Object.keys(config).forEach(function (provider) {
            loadProvidersScripts[provider](config[provider]);
        });
    };
    Angular2SocialLoginModule.forRoot = function () {
        return {
            ngModule: Angular2SocialLoginModule_1,
            providers: [auth_service_1.AuthService]
        };
    };
    return Angular2SocialLoginModule;
}());
Angular2SocialLoginModule = Angular2SocialLoginModule_1 = __decorate([
    core_1.NgModule()
], Angular2SocialLoginModule);
exports.Angular2SocialLoginModule = Angular2SocialLoginModule;
var Angular2SocialLoginModule_1;
//# sourceMappingURL=angular2-social-login.module.js.map