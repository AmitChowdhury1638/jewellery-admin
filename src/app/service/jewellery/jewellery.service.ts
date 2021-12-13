import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class JewelleryService {

  constructor(private http: HttpClient) { }

  url = api.jewelleries;

  getJewelleries() {
    return this.http.get(this.url)
  }

  deleteJewellery(data: any) {
    console.log('id :'+data.id);
    return this.http.delete(this.url+'/'+data.id);
  }

  createJewellery(data: any) {
    console.log('url : '+this.url)
    console.log('createJewellery: '+JSON.stringify(data));
    return this.http.post(this.url, data, {responseType: 'text'});
  }

  editJewellery(data: any) {
    return this.http.put(this.url+'/'+data.id, data);
  }

  uploadFile(event: any) {
    console.log("inside service: "+event.files[0].name);
    console.log(this.url+"/uploadMultipleFiles");
    debugger;
    //files: File=event.files;
    return this.http.post(this.url+"/uploadMultipleFiles", event.files);
  }
}