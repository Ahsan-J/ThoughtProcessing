import { Component, Input, EventEmitter, Output, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

type SupportingAction = {
  title: string;
  icon: string;
  action: (event?: MouseEvent) => void;
}

@Component({
  selector: 'md-text-editor',
  templateUrl: './md-text-editor.component.html',
  styleUrls: ['./md-text-editor.component.css']
})
export class MDTextEditor implements AfterViewInit {
  @Input() preview: boolean = true;
  @Input() markup: string = 'Chanting';
  @ViewChild('container') container!: ElementRef<any>;
  @Output() markupChange = new EventEmitter<string>();
  @ViewChild('cheatsheet') cheatsheetModal?: ModalComponent;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.generateMarkupElements();
  }

  generateMarkupElements() {
    this.markup.split('\n').forEach(content => {
      const li = this.renderer.createElement('li');
      li.textContent = content;
      this.renderer.appendChild(this.container.nativeElement, li);
    });
  }

  supportingActions: Array<SupportingAction> = [
    {
      title: "Heading Large",
      icon: "type-h1",
      action: (e) => {
        const sel = document.getSelection();
        if (sel && sel.anchorNode?.nodeType == Node.TEXT_NODE) {
          const value = sel.anchorNode.nodeValue?.includes('###') ? sel.anchorNode.nodeValue.replaceAll('###', '') : `### ${sel.anchorNode.nodeValue}`
          this.renderer.setValue(sel.anchorNode, value);
          this.updateValue();
        }
      }
    },
    {
      title: "Heading Medium",
      icon: "type-h2",
      action: () => {
        const sel = document.getSelection();
        if (sel && sel.anchorNode?.nodeType == Node.TEXT_NODE) {
          const value = sel.anchorNode.nodeValue?.includes('##') ? sel.anchorNode.nodeValue.replaceAll('##', '') : `## ${sel.anchorNode.nodeValue}`
          this.renderer.setValue(sel.anchorNode, value);
          this.updateValue();
        }
      }
    },
    {
      title: "Heading Small",
      icon: "type-h3",
      action: () => {
        const sel = document.getSelection();
        if (sel && sel.anchorNode?.nodeType == Node.TEXT_NODE) {
          const value = sel.anchorNode.nodeValue?.includes('#') ? sel.anchorNode.nodeValue.replaceAll('#', '') : `# ${sel.anchorNode.nodeValue}`
          this.renderer.setValue(sel.anchorNode, value);
          this.updateValue();
        }
      }
    },
    {
      title: "Italic",
      icon: "type-italic",
      action: () => {
        const sel = document.getSelection();
        if (sel && sel.anchorNode?.nodeType == Node.TEXT_NODE) {

          const value = sel.anchorNode.nodeValue?.includes('#') ? sel.anchorNode.nodeValue.replaceAll('#', '') : `# ${sel.anchorNode.nodeValue}`

          this.renderer.setValue(sel.anchorNode, value);
          this.updateValue();
        }
      }
    },
    {
      title: "Bold",
      icon: "type-bold",
      action() {

      }
    },
    {
      title: "Strike Through",
      icon: "type-strikethrough",
      action() {

      }
    },
    {
      title: "Underline",
      icon: "type-underline",
      action() {

      }
    },
    {
      title: "Markdown Guide",
      icon: "markdown",
      action: () => {
        this.cheatsheetModal?.showModal(true);
      }
    },
  ]

  updateValue(element = this.container.nativeElement) {
    let textNodes = [];
    if(element instanceof HTMLOListElement) {
      for(let child of element.children) {
        textNodes.push(child.textContent);
      }
    }

    const text = textNodes.join("\n");

    this.markup = text;
    this.markupChange.emit(text);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.target instanceof HTMLOListElement) {
      const text = e.target.innerText;

      if (text.length - 1 <= 0 && e.key == 'Backspace') {
        e.preventDefault();
        e.target.innerHTML = '<li></li>';
        this.updateValue(e.target);
      }
    }
  }

  onTextChange(e: Event) {
    if (e.target instanceof HTMLOListElement) {
      this.updateValue(e.target);
    }
  }
}
