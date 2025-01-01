import { ModalComponent } from "@/shared/components/modal/modal.component";
import { Component } from "@angular/core";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [ModalComponent]
})
export class HomeComponent{
  showModal = false;
}
