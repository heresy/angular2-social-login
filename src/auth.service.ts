import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

declare let gapi: any;
declare let IN: any;
declare let FB: any;

export interface IProvider {
    clientId: string;
    apiVersion?: string;
}

export interface IProviders {
    [provider: string]: IProvider;
}

@Injectable()
export class AuthService {
    gauth: any;
    
    login(provider: string): Observable<Object>{
        return Observable.create(
            (observer) => {
                switch(provider){
                    case "google":
                                    if (typeof(this.gauth) == "undefined"){
                                        this.gauth = gapi.auth2.getAuthInstance();
                                    }
                                    this.gauth.signIn().then(() => {
                                        let profile = this.gauth.currentUser.get().getBasicProfile();
                                        let idToken = this.gauth.currentUser.get().getAuthResponse().id_token
                                        let userDetails = {
                                            token: idToken,
                                            uid: profile.getId(),
                                            name: profile.getName(),
                                            email: profile.getEmail(),
                                            image: profile.getImageUrl(),
                                            provider: "google"
                                        };
                                        localStorage.setItem('_login_provider', 'google');
                                        observer.next(userDetails);
                                        observer.complete();
                                    })
                                    break;
                    case "facebook":
                                    FB.login(function(res){
                                        if(res.status == "connected"){
                                            FB.api('/me?fields=name,email,picture', function(res){
                                            if(!res || res.error){
                                                observer.error(res.error);
                                            }else{
                                                let userDetails = {name: res.name, email: res.email, uid: res.id, provider: "facebook", imageUrl: res.picture.data.url}
                                                localStorage.setItem('_login_provider', 'facebook');
                                                observer.next(userDetails);
                                                observer.complete();
                                            }
                                            });
                                        }
                                    });
                                    break;
                    case "linkedin":
                                    IN.User.authorize(function(){
                                        IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result(function(res){
                                            let userDetails = {name: res.firstName + " " + res.lastName, email: res.emailAddress, uid: res.id, provider: "linkedIN", imageUrl: res.pictureUrl};
                                            localStorage.setItem('_login_provider', 'linkedin');
                                            observer.next(userDetails);
                                            observer.complete();
                                        });
                                    });
                                    break;
                }
            }
        )
    }

    logout(): Observable<boolean>{
        let provider = localStorage.getItem("_login_provider");
        return Observable.create((observer) => {
            switch(provider){
                case "google":
                                let gElement = document.getElementById("gSignout");
                                if (typeof(gElement) != 'undefined' && gElement != null)
                                {
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
                                FB.logout(function(res){
                                    localStorage.removeItem('_login_provider');
                                    observer.next(true);
                                    observer.complete();
                                });
                                break;
                case "linkedin":
                                IN.User.logout(function(){
                                    localStorage.removeItem('_login_provider');
                                    observer.next(true);
                                    observer.complete();
                  				}, {});
                                break;
            }
        })
    }
}