import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'resizeable-container',
  templateUrl: './resizeable-container.component.html',
  styleUrls: ['./resizeable-container.component.css'],
})
export class ResizeableContainerComponent implements AfterViewInit {
  @Input() id?: string;
  @Input() style?: string;
  @Input() class?: string;
  @Input() minimumWidth: number = 20;
  @Input() minimumHeight: number = 20;
  @Input() width?: number;
  @Input() height?: number;
  @Input() allowDrag: boolean = true;
  @Input() allowResize: boolean = true;
  @Input() rounded?: boolean;
  @Input() type? = "primary";

  @ViewChild('resizaleDivRef') resizaleDivRef!: ElementRef<any>

  getData() {
    const parent = this.getParent(this.resizaleDivRef.nativeElement);
    if (parent) {
      const {
        left: relative_left,
        top: relative_top,
        x: relative_x,
        y: relative_y,
      } = parent.getBoundingClientRect();

      const {
        left: current_left,
        top: current_top,
        y: current_y,
        x: current_x,
        height,
        width,
        ...rest
      } = this.resizaleDivRef.nativeElement.getBoundingClientRect();

      return {
        ...rest,
        y: current_y - relative_y,
        x: current_x - relative_x,
        top: current_top - relative_top,
        left: current_left - relative_left,
        width,
        height
      }
    }
    return this.resizaleDivRef.nativeElement.getBoundingClientRect();
  }

  getParent(parent: HTMLElement, key: keyof CSSStyleDeclaration = "position", value = "relative"): HTMLElement | null {
    if (!parent) return null;

    if (parent.style[key] == value) {
      return parent;
    }

    if (!parent.parentElement) return null;

    return this.getParent(parent.parentElement, key, value);
  }

  registerResizeEvents(resizaleDivRef = this.resizaleDivRef) {
    if (resizaleDivRef.nativeElement && this.allowResize) {

      const resizers = resizaleDivRef.nativeElement.querySelectorAll('div') || [];

      let original_width = 0;
      let original_height = 0;
      let original_x = 0;
      let original_y = 0;
      let original_mouse_x = 0;
      let original_mouse_y = 0;

      for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];

        currentResizer.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (resizaleDivRef.nativeElement) {
            original_width = parseFloat(getComputedStyle(resizaleDivRef.nativeElement, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(resizaleDivRef.nativeElement, null).getPropertyValue('height').replace('px', ''));

            original_x = resizaleDivRef.nativeElement.getBoundingClientRect().left;
            original_y = resizaleDivRef.nativeElement.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
          }

          const resize = (e: MouseEvent) => {
            if (!resizaleDivRef.nativeElement) return;
            e.preventDefault();
            e.stopPropagation();

            const parent = this.getParent(resizaleDivRef.nativeElement);

            const {
              left: relative_left,
              top: relative_top,
              right: relative_right,
              height: relative_height,
              width: relative_width,
            } = parent ? parent.getBoundingClientRect() : { left: 0, top: 0, width: (this.minimumWidth || 20), height: (this.minimumHeight || 20), right: 0 };

            const {
              left: current_left,
              top: current_top,
              right: current_right,
            } = resizaleDivRef.nativeElement.getBoundingClientRect();

            if (currentResizer.classList.value.includes('bottom_right')) {
              let width = original_width + (e.pageX - original_mouse_x);
              let height = original_height + (e.pageY - original_mouse_y);

              if (height + (current_top - relative_top) > relative_height) height = relative_height - (current_top - relative_top);
              if (width + (current_left - relative_left) > relative_width) width = relative_width - (current_left - relative_left);

              if (width > (this.minimumWidth || 20)) {
                resizaleDivRef.nativeElement.style.width = width + 'px'
              }
              if (height > (this.minimumHeight || 20)) {
                resizaleDivRef.nativeElement.style.height = height + 'px'
              }

            } else if (currentResizer.classList.value.includes('bottom_left')) {
              let height = original_height + (e.pageY - original_mouse_y)
              let width = original_width - (e.pageX - original_mouse_x);

              if (height + (current_top - relative_top) > relative_height) height = relative_height - (current_top - relative_top);
              if (width + (relative_right - current_right) > relative_width) width = width + (relative_right - current_right);

              if (height > (this.minimumHeight || 20)) {
                resizaleDivRef.nativeElement.style.height = height + 'px'
              }

              if (width > (this.minimumWidth || 20) && current_right < relative_right) {
                let new_left_position = original_x + (e.pageX - original_mouse_x)
                if (relative_left > 0) new_left_position = new_left_position - relative_left;

                if (new_left_position > 0) {
                  resizaleDivRef.nativeElement.style.width = width + 'px'
                  resizaleDivRef.nativeElement.style.left = new_left_position + 'px'
                }
              }
            } else if (currentResizer.classList.value.includes('top_right')) {
              let width = original_width + (e.pageX - original_mouse_x)
              let height = original_height - (e.pageY - original_mouse_y)

              if (height + (current_top - relative_top) > relative_height) height = relative_height - (current_top - relative_top);
              if (width + (current_left - relative_left) > relative_width) width = relative_width - (current_left - relative_left);

              if (width > (this.minimumWidth || 20)) {
                resizaleDivRef.nativeElement.style.width = width + 'px'
              }

              if (height > (this.minimumHeight || 20)) {
                let new_top_position = original_y + (e.pageY - original_mouse_y)
                if (relative_top > 0) new_top_position = new_top_position - relative_top;

                if (new_top_position > 0) {
                  resizaleDivRef.nativeElement.style.height = height + 'px'
                  resizaleDivRef.nativeElement.style.top = new_top_position + 'px'
                }
              }
            } else if (currentResizer.classList.value.includes('top_left')) {
              let width = original_width - (e.pageX - original_mouse_x)
              let height = original_height - (e.pageY - original_mouse_y)

              if (height + (current_top - relative_top) > relative_height) height = relative_height - (current_top - relative_top);
              if (width + (relative_right - current_right) > relative_width) width = width + (relative_right - current_right);

              if (width > (this.minimumWidth || 20)) {
                let new_left_position = original_x + (e.pageX - original_mouse_x)
                if (relative_left > 0) new_left_position = new_left_position - relative_left;

                if (new_left_position > 0) {
                  resizaleDivRef.nativeElement.style.width = width + 'px'
                  resizaleDivRef.nativeElement.style.left = new_left_position + 'px'
                }
              }
              if (height > (this.minimumHeight || 20)) {
                let new_top_position = original_y + (e.pageY - original_mouse_y)
                if (relative_top > 0) new_top_position = new_top_position - relative_top;

                if (new_top_position > 0) {
                  resizaleDivRef.nativeElement.style.height = height + 'px'
                  resizaleDivRef.nativeElement.style.top = new_top_position + 'px'
                }
              }
            }
          }

          const stopResize = () => {
            window.removeEventListener('mousemove', resize)
          }

          window.addEventListener('mousemove', resize)
          window.addEventListener('mouseup', stopResize)
        })

      }
    }
  }

  registerDragEvents(resizaleDivRef = this.resizaleDivRef) {
    if (resizaleDivRef.nativeElement && this.allowDrag) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      const parent = this.getParent(resizaleDivRef.nativeElement);

      const dragMouseDown = (e: MouseEvent) => {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        pos3 = e.pageX;
        pos4 = e.pageY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      const elementDrag = (e: MouseEvent) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.pageX;
        pos2 = pos4 - e.pageY;
        pos3 = e.pageX;
        pos4 = e.pageY;

        const {
          right: relative_right,
          bottom: relative_bottom,
        } = parent ? parent.getBoundingClientRect() : { right: 0, bottom: 0 };

        // set the element's new position:
        if (resizaleDivRef.nativeElement) {

          const {
            height: current_height,
            top: current_top,
            left: current_left,
            width: current_width,
          } = resizaleDivRef.nativeElement.getBoundingClientRect();

          const new_top = (resizaleDivRef.nativeElement.offsetTop - pos2);
          if (relative_bottom) {
            if (new_top > 0 && (current_top + current_height - pos2) < relative_bottom) {
              resizaleDivRef.nativeElement.style.top = new_top + "px";
            }
          } else {
            resizaleDivRef.nativeElement.style.top = new_top + "px";
          }

          const new_left = (resizaleDivRef.nativeElement.offsetLeft - pos1);
          if (relative_right) {
            if (new_left > 0 && (current_left + current_width - pos1) < relative_right) {
              resizaleDivRef.nativeElement.style.left = (resizaleDivRef.nativeElement.offsetLeft - pos1) + "px";
            }
          } else {
            resizaleDivRef.nativeElement.style.left = (resizaleDivRef.nativeElement.offsetLeft - pos1) + "px";
          }
        }
      }

      const closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }

      const _ref = resizaleDivRef.nativeElement;
      _ref.addEventListener('mousedown', dragMouseDown);

      // return () => {
      //   _ref.removeEventListener('mousedown', dragMouseDown)
      // }
    }
  }

  ngAfterViewInit() {
    this.registerDragEvents();
    this.registerResizeEvents()
  }

}
