import { Component, Input, EventEmitter, Output, Renderer2, ViewChild, ElementRef, AfterViewInit, HostBinding } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { IconDefinition, faHeading, faItalic, faBold, faStrikethrough, faUnderline, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface SupportingAction {
  title: string;
  icon: IconDefinition;
  action: (event?: MouseEvent) => void;
}

@Component({
    selector: 'app-md-text-editor',
    templateUrl: './md-text-editor.component.html',
    imports: [ButtonComponent, FaIconComponent, ModalComponent]
})
export class MDTextEditorComponent implements AfterViewInit {
  @Input() preview = true;
  @Input() markup = 'Chanting';
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @Output() markupChange = new EventEmitter<string>();
  @ViewChild('cheatsheet') cheatsheetModal?: ModalComponent;

  constructor(private renderer: Renderer2) { }

  @HostBinding('class')
  className = 'h-full overflow-y-auto relative w-full flex flex-col p-2 bg-neutral-300 dark:bg-neutral-700 bg-opacity-10 rounded'

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

  supportingActions: SupportingAction[] = [
    {
      title: "Heading Large",
      icon: faHeading,
      action: () => {
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
      icon: faHeading,
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
      icon: faHeading,
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
      icon: faItalic,
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
      icon: faBold,
      action() {
        // TODO:
      }
    },
    {
      title: "Strike Through",
      icon: faStrikethrough,
      action() {
        // TODO:
      }
    },
    {
      title: "Underline",
      icon: faUnderline,
      action() {
        // TODO:
      }
    },
    {
      title: "Markdown Guide",
      icon: faQuestion,
      action: () => {
        this.cheatsheetModal?.showModal(true);
      }
    },
  ]

  updateValue(element = this.container.nativeElement) {
    const textNodes = [];
    if(element instanceof HTMLOListElement) {
      for(const child of element.childNodes) {
        textNodes.push(child.textContent);
      }
    }

    const text = textNodes.join("\n");
    console.log(text, textNodes, element)
    this.markup = text;
    this.markupChange.emit(text);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.target instanceof HTMLOListElement) {
      const text = e.target.innerText;

      if (text.length - 1 <= 0 && e.key == 'Backspace') {
        e.preventDefault();
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
