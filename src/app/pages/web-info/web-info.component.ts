import { Component, OnInit } from '@angular/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';
@Component({
  selector: 'app-web-info',
  templateUrl: './web-info.component.html',
  styleUrls: ['./web-info.component.css'],
})
export class WebInfoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getBytes(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsArrayBuffer(file);
  }
}
