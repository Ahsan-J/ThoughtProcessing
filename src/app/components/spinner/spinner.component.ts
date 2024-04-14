import { Component, Input } from '@angular/core';
import { ColorSchemes } from 'src/app/model/app';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  @Input() id?: string;
  @Input() class?: string;
  @Input() style?: { [klass: string]: any; };
  @Input() loader?: boolean;
  @Input() spinDuration?: number;
  @Input() type?: ColorSchemes;
  @Input() size?: "small" | "normal" | "large";
}
