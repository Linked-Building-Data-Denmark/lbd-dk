import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as auth from 'solid-auth-client';
declare let $rdf: any; // Minified version added in assets/js/libs

import { foaf, solid, schema, space, rdf } from 'rdf-namespaces';
import { fetchDocument, createDocument } from 'tripledoc';

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
    async getProfile(webId){
        /* 1. Fetch the Document at `webId`: */
        const webIdDoc = await fetchDocument(webId);
        /* 2. Read the Subject representing the current user's profile: */
        return webIdDoc.getSubject(webId);
    }

    async getNotesList(profile, type){
        /* 1. Check if a Document tracking our notes already exists. */
        const typeIndexRef = type == 'public' ? profile.getRef(solid.publicTypeIndex) : profile.getRef(solid.privateTypeIndex);
        const typeIndex = await fetchDocument(typeIndexRef);
        const notesListEntry = typeIndex.findSubject(solid.forClass, schema.TextDigitalDocument);

        /* 2. If it doesn't exist, create it. */
        if(notesListEntry === null) {
            // We will define this function later:
            return this.initialiseNotesList(profile, typeIndex, type);
        }

        /* 3. If it does exist, fetch that Document. */
        const notesListRef = notesListEntry.getRef(solid.instance);
        return await fetchDocument(notesListRef);
    }

    async initialiseNotesList(profile, typeIndex, type){
        // Get the root URL of the user's Pod:
        const storage = profile.getRef(space.storage);

        // Decide at what URL within the user's Pod the new Document should be stored:
        const notesListRef = storage + `${type}/notes.ttl`;
        // Create the new Document:
        const notesList = createDocument(notesListRef);
        await notesList.save();

        // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
        const typeRegistration = typeIndex.addSubject();
        typeRegistration.addRef(rdf.type, solid.TypeRegistration)
        typeRegistration.addRef(solid.instance, notesList.asRef())
        typeRegistration.addRef(solid.forClass, schema.TextDigitalDocument)
        await typeIndex.save([ typeRegistration ]);

        // And finally, return our newly created (currently empty) notes Document:
        return notesList;
    }

    async getNotes(profile, type){
        // Get notes list
        const notesList: any = await this.getNotesList(profile, type);

        const notes = notesList.getSubjectsOfType(schema.TextDigitalDocument);
        return notes.map(note => note.getString(schema.text));

    }

    async addNote(note, profile, type) {
        // Get notes list
        const notesList = await this.getNotesList(profile, type);

        // Initialise the new Subject:
        const newNote = notesList.addSubject();
      
        // Indicate that the Subject is a schema:TextDigitalDocument:
        newNote.addRef(rdf.type, schema.TextDigitalDocument);
      
        // Set the Subject's `schema:text` to the actual note contents:
        newNote.addString(schema.text, note);
      
        // Store the date the note was created (i.e. now):
        newNote.addDateTime(schema.dateCreated, new Date(Date.now()));
      
        const success = await notesList.save([newNote]);
        return success;
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