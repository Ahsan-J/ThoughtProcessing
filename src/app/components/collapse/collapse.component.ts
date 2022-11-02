import { Component, ElementRef, EventEmitter, Input, AfterViewInit, RendererStyleFlags2, Output, Renderer2, TemplateRef, OnChanges, ViewChild, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { nanoid } from "nanoid";

@Component({
  selector: 'collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CollapseComponent implements AfterViewInit, OnChanges  {

  id: string = '';
  @Input() collapse: boolean = false;
  @Output() onCollapse = new EventEmitter<boolean>();
  @Input() title: string = "";
  @Input() titleTemplate!: TemplateRef<any>;
  @ViewChild('container') container :ElementRef<HTMLDivElement> | undefined;
  @ViewChild('defaultTitle') defaultTitle!: TemplateRef<any>;

  constructor(private renderer: Renderer2){
    this.id = this.id || nanoid();
  }
  ngAfterViewInit() {
    this.updateCollapsingContainer();
  }

  onClick(e: MouseEvent) {
    this.collapse = !this.collapse;
    this.updateCollapsingContainer();
    this.onCollapse.emit(this.collapse);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collapse'] && (changes['collapse']?.previousValue != changes['collapse']?.currentValue)) {
      this.updateCollapsingContainer();
    }
  }

  updateCollapsingContainer(){
    if(this.container?.nativeElement) {
      const maxHeight = this.collapse ? this.container.nativeElement.scrollHeight + "px" : "";
      this.renderer.setStyle(this.container.nativeElement,"max-height", maxHeight, RendererStyleFlags2.DashCase);
    }
  }
}
