import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagesRoute!:string;

  constructor(private http:HttpClient) {
    this.imagesRoute = `${environment.apiUrl}/upload`;
  }

  /**
   * uploadImage
   */
  public uploadImage(image: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    return this.http.post(`${this.imagesRoute}Users`, formData, { headers });
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
    return this.http.post(`${this.imagesRoute}Games`, formData, { headers });
  }
}
