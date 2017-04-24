import { NgModule, ModuleWithProviders } from "@angular/core";
import { AuthService, IProviders, IProvider } from "./auth.service";

declare let gapi: any;
declare let IN: any;
declare let FB: any;

@NgModule({
    providers: [AuthService]
})
export class Angular2SocialLoginModule{
    static loadProvidersScripts(config: IProviders): void{
        const loadProvidersScripts: Object = {
            google: (info: IProvider) => {
                let d = document, gJs, ref: any = d.getElementsByTagName('script')[0];
                gJs = d.createElement('script');
                gJs.async = true;
                gJs.src = "//apis.google.com/js/platform.js";

                gJs.onload = function() {
                    gapi.load('auth2', function() {
                        gapi.auth2.init({
                        client_id: info["clientId"],
                        scope: 'email'
                        })
                    })
                }
                ref.parentNode.insertBefore(gJs, ref);
            },
            linkedin: (info: IProvider) => {
                let lIN, d = document, ref: any = d.getElementsByTagName('script')[0];
                lIN = d.createElement('script');
                lIN.async = false;
                lIN.src = "//platform.linkedin.com/in.js";
                lIN.text = ("api_key: " + info["clientId"]).replace("\"", "");
                ref.parentNode.insertBefore(lIN, ref);
            },
            facebook: (info: IProvider) => {
                let d = document, fbJs, id = 'facebook-jssdk', ref: any = d.getElementsByTagName('script')[0];
                fbJs = d.createElement('script');
                fbJs.id = id;
                fbJs.async = true;
                fbJs.src = "//connect.facebook.net/en_US/sdk.js";

                fbJs.onload = function() {
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
        }

        Object.keys(config).forEach((provider: string) => {
            (<any>loadProvidersScripts)[provider](config[provider]);
        });
    }
}