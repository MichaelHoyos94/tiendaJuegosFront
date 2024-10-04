import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = 'http://localhost:8081/api/v1/upload';

  constructor(private http:HttpClient) { }

  /**
   * uploadImage
   */
  public uploadImage(image: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    return this.http.post(`${this.url}Users`, formData, { headers });
  }
  /**
   * uploadImage
   */
  public uploadCover(image: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    return this.http.post(`${this.url}Games`, formData, { headers });
  }
}
