import { IBlog } from '@/core/models/blog/blog.model';
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { marked } from 'marked';

@Directive({
    selector: '[appMarkdown]'
})
export class MarkdownDirective {
  constructor(
    private el: ElementRef,
  ) { }

  @Input('appMarkdown') set markdown(content: IBlog['content'] | undefined) {
    if(typeof content == 'string') {
      this.el.nativeElement.innerHTML = marked.parse(content.replace(/^[\\u200B\\u200C\\u200D\\u200E\\u200F\\uFEFF]/,"").trim().replace(/\n\s+/g, '\n'));
    }
  };

  @HostBinding('class')
  markdownClasses = "markdown-body"
}
