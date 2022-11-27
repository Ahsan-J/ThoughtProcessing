import { Component, Input, EventEmitter, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
export class MDTextEditor {
  @Input() preview: boolean = true;
  @Input() markup: string = '';
  @ViewChild('container') container!: ElementRef<any>;
  @Output() markupChange = new EventEmitter<string>();
  @ViewChild('cheatsheet') cheatsheetModal?: ModalComponent;

  constructor(private renderer: Renderer2) { }

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
      title: "Markdown",
      icon: "markdown",
      action: () => {
        this.cheatsheetModal?.showModal(true);
      }
    },
  ]

  updateValue(text = this.container.nativeElement.innerText) {
    this.markup = text;
    this.markupChange.emit(text);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.target instanceof HTMLOListElement) {
      const text = e.target.innerText;

      if (text.length - 1 <= 0 && e.key == 'Backspace') {
        this.updateValue('');
        e.preventDefault();
        e.target.innerHTML = '<li></li>';
      }
    }
  }

  onTextChange(e: Event) {
    if (e.target instanceof HTMLOListElement) {
      const text = e.target.innerText;
      this.updateValue(text);
    }
  }
}
