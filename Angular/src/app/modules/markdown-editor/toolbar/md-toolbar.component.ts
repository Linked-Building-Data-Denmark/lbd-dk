import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { 
    faListOl, faListUl, faEye, faEyeSlash, faInfo, 
    faUndo, faItalic, faBold, faImage, faVideo, faLink,
    faHeading, faCode, faQuoteRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'md-toolbar',
    templateUrl: './md-toolbar.component.html',
    styleUrls: ['./md-toolbar.component.css']
})
export class MDToolbarComponent implements OnInit {

    faListOl = faListOl;
    faListUl = faListUl;
    faEye = faEye;
    faEyeSlash = faEyeSlash;
    faInfo = faInfo;
    faItalic = faItalic;
    faBold = faBold;
    faUndo = faUndo;
    faImage = faImage;
    faVideo = faVideo;
    faLink = faLink;
    faHeading = faHeading;
    faCode = faCode;
    faQuoteRight = faQuoteRight;

    previewColor = "orangered";

    showPreviewTooltip = 'Show preview';
    hidePreviewTooltip = 'Hide preview';
    ulTooltip = 'Unordered list';
    olTooltip = 'Ordered list';
    boldTooltip = 'Bold';
    italicTooltip = 'Italic';
    quoteTooltip = 'Quote';
    undoTooltip = 'undo';
    imageTooltip = 'insert image';
    videoTooltip = 'insert video';
    linkTooltip = 'insert link';
    headingTooltip = 'insert heading';
    subHeadingTooltip = 'insert sub-heading';
    codeTooltip = 'insert code';

    public showPreview: boolean = false;
    @Output() onTogglePreview = new EventEmitter<boolean>();
    @Output() onSelectionFormat = new EventEmitter<string>();           // Fired when a text format button is clicked. Returns formatted text
    @Output() onTextInsert = new EventEmitter<string>();                // Fired when a text insert button is clicked. Returns the text to be inserted
    @Output() onInsertAtCurrentPosition = new EventEmitter<string>();
    @Output() onUndo = new EventEmitter<void>();

    @Input() selectedText: string;

    constructor() { }

    ngOnInit(): void { }

    togglePreview(){
        this.showPreview = !this.showPreview;
        this.onTogglePreview.emit(this.showPreview);
    }

    undo(){
        this.onUndo.emit();
    }

    // Unordered list
    appendUl(){
        // If text selection
        if(this.selectedText){
            const txt = this._appendStartEachLine(this.selectedText, '* ');
            this.onSelectionFormat.emit(txt);
        }
        // If no text selection
        else{
            const txt = `* Item 1\n* Item 2\n* Item 3`;
            this.onTextInsert.emit(txt);
        }        
    }

    // Ordered list
    appendOl(){
        // If text selection
        if(this.selectedText){
            const txt = this._appendStartEachLine(this.selectedText, '1. ');
            this.onSelectionFormat.emit(txt);
        }
        // If no text selection
        else{
            const txt = `1. Item 1\n2. Item 2\n3. Item 3`;
            this.onTextInsert.emit(txt);
        }
    }

    appendBold(){
        const txt = this._appendStartEnd(this.selectedText, '**');
        this.onSelectionFormat.emit(txt);
    }

    appendItalic(){
        const txt = this._appendStartEnd(this.selectedText, '*');
        this.onSelectionFormat.emit(txt);
    }

    appendQuote(){
        const txt = this._appendStartEachLine(this.selectedText, '> ');
        this.onSelectionFormat.emit(txt);
    }

    insertHeading(){
        // If text selection
        if(this.selectedText){
            const txt = this._appendStartEachLine(this.selectedText, '---\n## ');
            this.onSelectionFormat.emit(txt);
        }
        // If no text selection
        else{
            const txt = `---\n## Section A\n\n`;
            this.onTextInsert.emit(txt);
        }
    }

    insertSubHeading(){
        // If text selection
        if(this.selectedText){
            const txt = this._appendStartEachLine(this.selectedText, '### ');
            this.onSelectionFormat.emit(txt);
        }
        // If no text selection
        else{
            const txt = `### Section A.a\n\n`;
            this.onTextInsert.emit(txt);
        }
    }

    insertLink(){
        const txt = `[link to LBD-DK](https://linked-building-data-denmark.github.io/lbd-dk/)`;
        this.onTextInsert.emit(txt);
    }

    insertImage(){
        const txt = `![Some image caption](https://octodex.github.com/images/yaktocat.png)`;
        this.onTextInsert.emit(txt);
    }

    insertCode(){
        const txt = '```sparql\nSELECT * WHERE {?s ?p ?o};\n```';
        this.onTextInsert.emit(txt);
    }

    // insertVideo(){
    //     const imgText = `![Some image caption](https://octodex.github.com/images/yaktocat.png)`;
    //     this.onTextInsert.emit(imgText);
    // }

    showGuide(){
        window.open("https://guides.github.com/features/mastering-markdown/");
    }

    private _appendStartEachLine(text: string, toAppend: string){
        if(!text || !toAppend) return;
        const newText = text
                        .split('\n')
                        .map(text => {
                            if(text != ""){
                                text = toAppend + text;
                            }
                            return text;
                        })
                        .join('\n');
        return newText;
    }

    private _appendStartEnd(text: string, toAppend: string){
        const newText = toAppend + text + toAppend;
        return newText;
    }

}
