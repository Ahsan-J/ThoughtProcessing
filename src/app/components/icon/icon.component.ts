import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input() name: string = "question";
  @Input() height: string = "1em";
  @Input() width: string = "1em";
  @Input() fill: string = "currentColor";
};
