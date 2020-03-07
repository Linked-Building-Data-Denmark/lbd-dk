import { Injectable } from '@angular/core';
import auth from 'solid-auth-client';
import { fetchDocument } from 'tripledoc';

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

    // Tripledoc seems to be pretty popular!
    // Continue here: https://solidproject.org/for-developers/apps/first-app/3-reading-data
    async getProfile(webId){
        /* 1. Fetch the Document at `webId`: */
        const webIdDoc = await fetchDocument(webId);
        /* 2. Read the Subject representing the current user's profile: */
        return webIdDoc.getSubject(webId);
    }

}