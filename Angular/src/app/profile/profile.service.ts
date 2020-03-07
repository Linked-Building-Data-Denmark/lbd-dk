import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// declare let Tripledoc: any; // Minified version added in assets/js/libs
import { foaf, solid, schema, space, rdf } from 'rdf-namespaces';
import { fetchDocument, createDocument } from 'tripledoc';
import { UserService } from '../services/user.service';

@Injectable()
export class ProfileService extends UserService {

    constructor(
        private http: HttpClient
    ){super()}

    async getNotesList(profile, type){

        if(!profile || profile == undefined) return;

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

        if(!profile || profile == undefined) return;

        // Get notes list
        const notesList: any = await this.getNotesList(profile, type);

        const notes = notesList.getSubjectsOfType('http://schema.org/TextDigitalDocument');
        return notes.map(note => note.getString('http://schema.org/text'));

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









    async queryDB(){
        const token = this.session.authorization.access_token;
        const q = "SELECT * WHERE { ?s ?p ?o . }";
        const endpoint = "https://mads.inrupt.net/data";

        let params = new HttpParams().set('query', q);
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // 'Authorization', `Bearer ${token}`

        return this.http.get(endpoint, {params, headers}).toPromise();
        
    }

}