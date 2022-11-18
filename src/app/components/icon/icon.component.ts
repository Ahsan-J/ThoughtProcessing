import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core'

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements AfterViewInit {
  @Input() name: string = "question";
  @Input() height: string = "1em";
  @Input() width: string = "1em";
  @Input() fill: string = "currentColor";
  @Output() click: EventEmitter<MouseEvent> | undefined;
  ngAfterViewInit() {
    console.log(this.width, this.height);
  }
};
