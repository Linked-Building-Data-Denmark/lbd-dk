import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as auth from 'solid-auth-client';
declare let $rdf: any; // Minified version added in assets/js/libs
declare let Tripledoc: any; // Minified version added in assets/js/libs

@Injectable()
export class ProfileService {

    public session;
    public store;

    constructor(
        private http: HttpClient
    ){
        this.store = $rdf.graph();
    }

    test(){
        auth.trackSession(session => {
            if (!session)
              console.log('The user is not logged in')
            else
              console.log(`The user is ${session.webId}`)
          })
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

    // Tripledoc seems to be pretty popular!
    // Continue here: https://solidproject.org/for-developers/apps/first-app/3-reading-data
    async getNameTripledoc(webId){
        /* 1. Fetch the Document at `webId`: */
        const webIdDoc = await Tripledoc.fetchDocument(webId);
        /* 2. Read the Subject representing the current user's profile: */
        const profile = webIdDoc.getSubject(webId);
        /* 3. Get their foaf:name: */
        return profile.getString('http://xmlns.com/foaf/0.1/name');
    }

    async getNameRdflib(webId){
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store, {});
        await fetcher.load(webId);
        const me = $rdf.sym(webId);
        const name = store.any(me, $rdf.sym('http://xmlns.com/foaf/0.1/name'), null, me.doc());
        // Note that this will also return invalid Literal data (integers, dates, etc.)
        return (name && name.termType === 'Literal') ? name.value : null;
    }

    async queryDB(){
        console.log(this.session);
        const token = this.session.authorization.access_token;
        const q = "SELECT * WHERE { ?s ?p ?o . }";
        const endpoint = "https://mads.inrupt.net/data";

        let params = new HttpParams().set('query', q);
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // 'Authorization', `Bearer ${token}`

        return this.http.get(endpoint, {params, headers}).toPromise();
        
    }

    /**
     * Gets any resource that matches the node, using the provided Namespace
     * @param {string} node The name of the predicate to be applied using the provided Namespace 
     * @param {$rdf.namespace} namespace The RDF Namespace
     * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me) 
     */
    private getValueFromNamespace(node: string, namespace: any, webId?: string): string | any {
        const store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
        if (store) {
        return store.value;
        }
        return '';
    }

}