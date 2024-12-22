import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-popular-tags',
    styleUrls: ['./popular-tags.component.css'],
    templateUrl: './popular-tags.component.html',
    imports: [NgFor]
})
export class PopularTagsComponent{
  tags= ['tag1', 'tag2'];
}
