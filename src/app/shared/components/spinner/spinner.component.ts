import { Component, Input } from '@angular/core';
import { ColorSchemes } from '@/core/types/pagination.type';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
    imports: [CommonModule]
})
export class SpinnerComponent {
  @Input() id?: string;
  @Input() class?: string;
  @Input() style?: Record<string, unknown>;
  @Input() loader?: boolean;
  @Input() spinDuration?: number;
  @Input() type?: ColorSchemes;
  @Input() size?: "small" | "normal" | "large";
}
