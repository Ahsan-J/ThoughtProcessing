import { Component, ElementRef, EventEmitter, Input, AfterViewInit, RendererStyleFlags2, Output, Renderer2, TemplateRef, OnChanges, ViewChild, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { nanoid } from "nanoid";
import { CollapseDirection } from "src/app/constant/app";

@Component({
    selector: 'collapse',
    templateUrl: './collapse.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    standalone: false
})
export class CollapseComponent implements AfterViewInit, OnChanges  {

  id: string = '';
  @Input() collapse: boolean = false;
  @Output() onCollapse = new EventEmitter<boolean>();
  @Input() title: string = "";
  @Input() titleTemplate!: TemplateRef<any>;
  @Input() direction: CollapseDirection = CollapseDirection.VERTICAL;
  @ViewChild('container') container :ElementRef<HTMLDivElement> | undefined;
  @ViewChild('defaultTitle') defaultTitle!: TemplateRef<any>;


  get contentDirectionalChange () {
    return this.direction == CollapseDirection.VERTICAL ? 'max-h-0': 'max-w-0';
  }

  constructor(private renderer: Renderer2){
    this.id = this.id || nanoid();
  }
  ngAfterViewInit() {
    // this.updateCollapsingContainer();
  }

  onClick(e: MouseEvent) {
    this.collapse = !this.collapse;
    this.updateCollapsingContainer();
    this.onCollapse.emit(this.collapse);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collapse'] && (changes['collapse']?.previousValue != changes['collapse']?.currentValue)) {
      // this.updateCollapsingContainer();
    }
  }

  updateCollapsingContainer(){
    if(this.direction == CollapseDirection.VERTICAL && this.container?.nativeElement) {
      const maxHeight = this.collapse ? this.container.nativeElement.scrollHeight + "px" : "";
      this.renderer.setStyle(this.container.nativeElement,"max-height", maxHeight, RendererStyleFlags2.DashCase);
    }

    if(this.direction == CollapseDirection.HORIZONTAL && this.container?.nativeElement) {
      const maxWidth = this.collapse ? this.container.nativeElement.scrollWidth + "px" : "";
      this.renderer.setStyle(this.container.nativeElement,"max-width", maxWidth, RendererStyleFlags2.DashCase);
    }
  }
}
