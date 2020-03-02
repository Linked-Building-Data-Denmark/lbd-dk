import { Injectable } from '@angular/core';
import auth from 'solid-auth-client';

@Injectable()
export class UserService {

    public session;

    // NB! Also possible to choose other options than community
    async login(idp?){
        if(!idp) idp = 'https://solid.community';
        const session = await auth.currentSession();
        if (!session){
            await auth.login(idp);
            return session;
        }
        else{
            return session;
        }
    }

    async popupLogin() {
        let session = await auth.currentSession();
        let popupUri = 'https://solid.community/common/popup.html';
        // if (!session)
        //   session = await auth.popupLogin({ popupUri });
        alert(`Logged in as ${session.webId}`);
    }

    async logOut(){
        return await auth.logout();
    }

    getLoginStatus(){
        return new Promise((resolve, reject) => {
            auth.trackSession(session => {
                if(!session){
                    resolve(false);
                }else{
                    this.session = session;
                    resolve(session);
                }
            })
        })
    }

}