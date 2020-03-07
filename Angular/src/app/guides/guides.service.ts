import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { foaf, solid, schema, space, rdf, sioc } from 'rdf-namespaces';
import { fetchDocument, createDocument } from 'tripledoc';

@Injectable()
export class GuidesService extends UserService {

    // This method returns the guides list
    // Guides ares stored in the users public type index for class sioc:Post
    async getGuidesList(profile){

        if(!profile || profile == undefined) return;

        /* 1. Check if a Document tracking the users guides already exists. */
        const typeIndexRef = profile.getRef(solid.publicTypeIndex);
        const typeIndex = await fetchDocument(typeIndexRef);

        // The guides list (a guide is stored as a sioc:Post)
        const guidesListEntry = typeIndex.findSubject(solid.forClass, sioc.Post);

        /* 2. If it doesn't exist, create it. */
        if(guidesListEntry === null) {
            // We will define this function later:
            return this.initialiseGuidesList(profile, typeIndex);
        }

        /* 3. If it does exist, fetch that Document. */
        const guidesListRef = guidesListEntry.getRef(solid.instance);
        return await fetchDocument(guidesListRef);
    }

    // If no guides list is available in the users pod we create one in public/lbd-guides.ttl
    // Maybe we should just use posts.ttl and later filter for a specific type of post (LBD-guide)?
    async initialiseGuidesList(profile, typeIndex){
        // Get the root URL of the user's Pod:
        const storage = profile.getRef(space.storage);

        // Decide at what URL within the user's Pod the new Document should be stored:
        const guidesListRef = storage + `public/lbd-guides.ttl`;
        // Create the new Document:
        const guidesList = createDocument(guidesListRef);
        await guidesList.save();

        // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
        const typeRegistration = typeIndex.addSubject();
        typeRegistration.addRef(rdf.type, solid.TypeRegistration)
        typeRegistration.addRef(solid.instance, guidesList.asRef())
        typeRegistration.addRef(solid.forClass, sioc.Post)
        await typeIndex.save([ typeRegistration ]);

        // And finally, return our newly created (currently empty) notes Document:
        return guidesList;
    }

    // This method adds a guide
    // A guide is an instance of sioc:Post
    async addGuide(title, language, text , profile) {
        // Get notes list
        const guidesList = await this.getGuidesList(profile);

        // This is where we add the blog post

        // // Initialise the new Subject:
        // const newNote = guidesList.addSubject();
      
        // // Indicate that the Subject is a schema:TextDigitalDocument:
        // newNote.addRef(rdf.type, schema.TextDigitalDocument);
      
        // // Set the Subject's `schema:text` to the actual note contents:
        // newNote.addString(schema.text, note);
      
        // // Store the date the note was created (i.e. now):
        // newNote.addDateTime(schema.dateCreated, new Date(Date.now()));
      
        // const success = await guidesList.save([newNote]);
        // return success;
    }

}