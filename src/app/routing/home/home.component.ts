import { Component } from "@angular/core";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent{
  showModal: boolean = false;
}
