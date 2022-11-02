import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'random-image',
  template: '',
  styleUrls: ['./random-image.component.css'],
})
export class RandomImageComponent implements OnInit {
  rects: Array<HTMLDivElement> = new Array();
  @Input() size: number = 100;

  num: number = this.size;

  constructor(private screenRef: ElementRef) { }

  ngOnInit() {
    this.num = this.size;

    while (this.num - 1) {
      this.num = this.num - 1;

      const div = document.createElement('div');
      this.screenRef.nativeElement.appendChild(div);
      this.rects.push(div);
      this.newPos(div);
    }
    this.draw();
  }

  newPos(rect: HTMLDivElement) {

    rect.style.left = Math.floor(Math.random() * (40 - 20) + 20) + '%';
    rect.style.top = Math.floor(Math.random() * (40 - 20) + 20) + '%';
    rect.style.width = Math.floor(Math.random() * (100 - 20) + 20) + '%';
    rect.style.height = Math.floor(Math.random() * (100 - 20) + 20) + '%';
    rect.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    rect.style.transform = "rotate(" + Math.floor(Math.random() * 720) + 'deg) translateX(' + Math.floor(Math.random() * (100 - 0) + 0) + '%) translateY(' + Math.floor(Math.random() * (100 - 0) + 0) + '%)';
    rect.style.zIndex = `${Math.random() * this.num}`
    rect.style.position= 'absolute';
    rect.style.transition= '0.5s';
    rect.style.opacity = '0.5';
    // borderRadius: Math.floor(Math.random() *50) + '%'
  }

  draw() {
    this.rects?.forEach(rect => this.newPos(rect));
    this.screenRef.nativeElement.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
