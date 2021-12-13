import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  url = api.categories;

  getCategories() {
    return this.http.get(this.url)
  }

  deleteCategory(data: any) {
    console.log('id :'+data.id);
    return this.http.delete(this.url+'/'+data.id);
  }

  createCategory(data: any) {
    console.log('url : '+this.url)
    console.log('createCategory: '+JSON.stringify(data));
    return this.http.post(this.url, data, {responseType: 'text'});
  }

  editCategory(data: any) {
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
