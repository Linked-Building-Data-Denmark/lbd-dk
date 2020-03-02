import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mhra-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.css']
})
export class MarkdownEditorComponent implements OnInit {

    public text: string = "## Markdown __rulez__!  \n\
---\n\
\n\
### Syntax highlight\n\
```sparql\n\
SELECT * WHERE {?s ?p ?o};\n\
```\n\
\n\
### Lists\n\
1. Ordered list\n\
2. Another bullet point\n\
    - Unordered list\n\
    - Another unordered bullet point\n\
    \n\
### Blockquote\n\
> Blockquote to the max";

    public showPreview: boolean = false;

    constructor() { }

    ngOnInit(): void { }

    togglePreview(){
        this.showPreview = !this.showPreview;
    }

    onReady(){
        console.log("ready")
    }

    showGuide(){
        window.open("https://guides.github.com/features/mastering-markdown/");
    }
}
