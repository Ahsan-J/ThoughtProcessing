import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IBlog } from 'src/app/model/blog';
import { marked } from 'marked';

@Directive({
  selector: '[markdown]',
})
export class MarkdownDirective {
  constructor(
    private el: ElementRef,
  ) { }

  @Input('markdown') set markdown(content: IBlog['content'] | undefined) {
    if(content) {
      this.el.nativeElement.innerHTML = marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""));
    }
  };


}
