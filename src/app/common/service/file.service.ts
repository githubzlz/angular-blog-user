import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  /**
   * 后台服务地址
   */
  baseUrl = environment.BASE_DATA_SERVER_URL;

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData) {
    const url = this.baseUrl + '/file/image/upload';
    return this.http.post(url, formData);
  }
}
