import { Component, ElementRef, EventEmitter, Input, RendererStyleFlags2, Output, Renderer2, TemplateRef, OnChanges, ViewChild, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { nanoid } from "nanoid";
import { CollapseDirection } from "@/core/constant/app.enum";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [CommonModule, ButtonComponent]
})
export class CollapseComponent implements OnChanges  {

  id = '';
  @Input() collapse = false;
  @Output() collapseChange = new EventEmitter<boolean>();
  @Input() title = "";
  @Input() titleTemplate!: TemplateRef<HTMLElement>;
  @Input() direction: CollapseDirection = CollapseDirection.VERTICAL;
  @ViewChild('container') container :ElementRef<HTMLDivElement> | undefined;
  @ViewChild('defaultTitle') defaultTitle!: TemplateRef<HTMLElement>;


  get contentDirectionalChange () {
    return this.direction == CollapseDirection.VERTICAL ? 'max-h-0': 'max-w-0';
  }

  constructor(private renderer: Renderer2){
    this.id = this.id || nanoid();
  }

  onClick() {
    this.collapse = !this.collapse;
    this.updateCollapsingContainer();
    this.collapseChange.emit(this.collapse);
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
