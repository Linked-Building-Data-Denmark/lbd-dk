import { Injectable } from '@angular/core';
import * as auth from 'solid-auth-client';

@Injectable()
export class ProfileService {

    constructor(){}

    test(){
        auth.trackSession(session => {
            if (!session)
              console.log('The user is not logged in')
            else
              console.log(`The user is ${session.webId}`)
          })

        auth.fetch('https://timbl.com/timbl/Public/friends.ttl')
          .then(console.log);
    }

    getLoginStatus(){
        return new Promise((resolve, reject) => {
            auth.trackSession(session => {
                if(!session){
                    resolve(false);
                }else{
                    resolve(session);
                }
            })
        })
    }

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

}