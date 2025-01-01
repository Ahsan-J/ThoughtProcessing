import { Component, Input } from '@angular/core';
import { ColorSchemes } from '@/core/types/pagination.type';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  @Input() id?: string;
  @Input() class?: string;
  @Input() loader?: boolean;
  @Input() spinDuration?: number;
  @Input() type?: ColorSchemes;
  @Input() size?: "small" | "normal" | "large";
}
