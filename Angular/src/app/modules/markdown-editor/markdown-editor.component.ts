import { Component, OnInit, NgZone, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
    selector: 'mhra-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

    @Input() height: string = "400px";
    @Output() onTextChange = new EventEmitter<string>();

    public text: string = "## Test guide  \n\
\n\
This is my very first guide\n\
It has a code snipptet in SPARQL\n\
```sparql\n\
SELECT * WHERE {?s ?p ?o};\n\
```\n\
\n\
### Lists\n\
This is a sub-section that shows that lists can be ordered or unordered or even mixed.\n\
1. Ordered list\n\
2. Another bullet point\n\
    - Unordered list\n\
    - Another unordered bullet point\n\
    \n\
---\n\
## Section 2\n\
This section shows a simple block quote\n\
> Blockquote to the max\n\n\
And an image\n\
![Awesome image caption](https://octodex.github.com/images/yaktocat.png)";

    public showPreview: boolean = false;

    public textHistory: string[] = [];

    // Selection
    public selectedText: string;
    public selectionIndexStart: number;
    public selectionIndexEnd: number;

    // Caret
    public currentCaretPosition: number = 0;    // position index

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor(private _ngZone: NgZone) {}

    ngOnInit(): void { }

    onReady(){
        console.log("ready")
    }

    // Handle typing and clicking in the text field
    handleClickSelect(ev){
        const start = ev.target.selectionStart;
        const end = ev.target.selectionEnd;

        // Nothing is selected (it is a caret position change)
        // The caret is the position where text will be placed
        if(start == end){
            this.currentCaretPosition = ev.target.selectionStart;
            this.selectedText = null;
        }

        // The user has selected part of the text
        else{
            this.selectedText = ev.target.value.substr(start, end - start);
            this.selectionIndexStart = start;
            this.selectionIndexEnd = end;
        }
        
        this.onchange();
    }

    // Used to replace selected text with something else
    // Usually used to append something to the text
    updateSelection(newText){
        // Save old in history
        this.textHistory.push(this.text);

        // Replace selection with the content of newText
        const textBeforeSelection = this.text.substr(0, this.selectionIndexStart);
        const textAfterSelection = this.text.substr(this.selectionIndexEnd, this.text.length);

        // Update text
        this.text = textBeforeSelection + newText + textAfterSelection;

        // Update selection + index end (new text doesn't have the same length as the text it replaces)
        this.selectionIndexEnd = this.selectionIndexStart+newText.length;
        this.selectedText = newText;

        this.onchange();
    }

    // Inserts text at the current caret position
    insertText(text){
        const index = this.currentCaretPosition;
        const textBeforeSelection = this.text.substr(0, index);
        const textAfterSelection = this.text.substr(index);
        this.text = textBeforeSelection + text + textAfterSelection;
        this.onchange();
    }

    onUndo(){
        this.text = this.textHistory.pop();
        this.onchange();
    }

    // Triggers a resize of the text area
    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    onchange(){
        this.onTextChange.emit(this.text);
    }

}
