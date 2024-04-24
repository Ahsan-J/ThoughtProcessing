import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { getNumberFromMeasuredUnit } from 'src/app/shared/utility';
import { ModalComponent } from '../modal/modal.component';
import { ResizeableContainerComponent } from '../resizeable-container/resizeable-container.component';
import { faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent {
  @Input() id?: string;
  @Input() class?: string = '';
  @Input() style?: string;
  @Input() src?: string | File;
  @Input() width?: string | number = "20rem";
  @Input() showUploader: boolean = true;
  @Input() rounded?: boolean;
  @Input() name?: string;
  @Input() type? = "primary";
  @Input() title?: string;

  @ViewChild('canvasRef') canvasRef!: ElementRef<any>;
  @ViewChild('modalRef') modalRef!: ModalComponent;
  @ViewChild('resizerRef') resizerRef!: ResizeableContainerComponent;
  @ViewChild('fileRef') fileRef!: ElementRef<any>;

  @Output() onCrop = new EventEmitter<File>();

  inputImage!: HTMLImageElement;
  outputImage!: File;

  faImage = faImage;

  constructor(private cd: ChangeDetectorRef) {}

  get real_width() {
    return getNumberFromMeasuredUnit(`${this.width}`);
  }

  get calculated_dimension() {
    if (this.inputImage) {
      const ratio = this.real_width / this.inputImage.width;
      return {
        width: ratio * this.inputImage.width,
        height: ratio * this.inputImage.height
      };
    }
    return { width: 0, height: 0 };
  }

  get minimumSize() {
    if(this.calculated_dimension.width > this.calculated_dimension.height) {
      return this.calculated_dimension.height;
    }
    return this.calculated_dimension.width
  }

  onShowUploader(e: MouseEvent) {
    e.preventDefault();
    this.fileRef.nativeElement.click()
  }

  loadImage(src = this.src) {
    if (src) {
      const img = new Image();
      img.onload = () => {
        this.inputImage = img;
        this.modalRef.showModal(true);
        this.drawImage(img);
      }

      if (src instanceof File) {
        const { name } = src;
        img.src = URL.createObjectURL(src)
        this.title = name || this.title;
      } else {
        img.src = src;
      }
    }
  }

  drawImage(inputImage = this.inputImage) {
    const ctx = this.canvasRef.nativeElement?.getContext('2d');
    if (ctx && inputImage) {
      ctx.drawImage(inputImage, 0, 0, this.calculated_dimension.width, this.calculated_dimension.height);
      // this.cd.detectChanges();
    }
  }

  onCropPress(event: MouseEvent) {
    const data = this.resizerRef.getData();
    const ctx = this.canvasRef.nativeElement?.getContext('2d');

    if (ctx && data) {
      const imageData = ctx.getImageData(data.x, data.y, data.width, data.height)

      const canvas = document.createElement('canvas');
      const ctx1 = canvas.getContext('2d');
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      ctx1?.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `${this.title || "crop_image"}.jpg`, { type: "image/jpeg" })

          if (this.fileRef.nativeElement) { // make sure output is sync with element
            const dt = new DataTransfer();
            dt.items.add(file);
            this.fileRef.nativeElement.files = dt.files;
          }

          this.outputImage = file;
          this.onCrop.emit(file);
          this.modalRef.showModal(false);
        }
      });
    }
  }

  onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement | null)?.files?.[0];

    if (file) {
      const img = new Image();
      img.onload = () => {
        this.inputImage = img;
        this.modalRef.showModal(true);
        this.drawImage(img);
      }
      img.src = URL.createObjectURL(file);
      this.title = file.name || this.title;
    }
  }

  onDragEnter(e: DragEvent) {
    e.preventDefault();
    if (e.target instanceof HTMLButtonElement) {
      const hoverClass = 'dragHover';
      if (!e.target.classList.contains(hoverClass)) {
        e.target.classList.add(hoverClass);
      }
    }
  }

  onDragLeave(e: DragEvent) {
    if (e.target instanceof HTMLButtonElement) {
      const hoverClass = 'dragHover';
      if (e.target.classList.contains(hoverClass)) {
        e.target.classList.remove(hoverClass);
      }
    }
  }

  onDrop(e: DragEvent) {
    e.preventDefault();

    const hoverClass = 'dragHover';
    if (e.target instanceof HTMLButtonElement && e.target.classList.contains(hoverClass)) {
      e.target.classList.remove(hoverClass);
    }

    if (e.dataTransfer?.items) {
      const items = [...e.dataTransfer.items];
      const item = items[0];

      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          const img = new Image();
          img.onload = () => {
            this.inputImage = img;
            this.modalRef.showModal(true);
            this.drawImage(img);
          }
          img.src = URL.createObjectURL(file);
          this.title = file.name || this.title;
        }
      }
    } else if(e.dataTransfer?.files) {
      const files = [...e.dataTransfer.files];
      const file = files[0];

      if (file) {
        const img = new Image();
        img.onload = () => {
          this.inputImage = img;
          this.modalRef.showModal(true);
          this.drawImage(img);
        }
        img.src = URL.createObjectURL(file);
        this.title = file.name || this.title;
      }
    }
  }
}
