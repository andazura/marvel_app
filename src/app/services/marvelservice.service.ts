import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MarvelserviceService {

  private urlheroes = "https://gateway.marvel.com:443/v1/public/characters";
  private key = "?ts=1&apikey=0d43622f71e1751f2de11282ed51b7f7";
  constructor(private http:HttpClient) {}
  
  getAllHeroes(limit=10,offset = 0){
    return this.http.get(this.urlheroes+this.key+`&limit=${limit}&offset=${offset}`)
    .pipe(
      map(res =>{
        return res;
      })
    );
  }
  
  buscarHeroes( termino: string,limit:number = 10,offset:number=0){
    return this.http.get(`${this.urlheroes}${this.key}&nameStartsWith=${termino}&limit=${limit}&offset=${offset}`)
    .pipe(
      map(res =>{
        return res;
      })
    );
  }
  
  detalleComic(url:String){
    return this.http.get(`${url}${this.key}`)
    .pipe(
      map(res =>{
        return res;
      })
    );

  }

  private crearArreglo(obj:Object){
    // const heroes:any;
    // Object.keys(obj).forEach(key  => {
    //    const heroe:Object= obj[key];
    // })
  }
}
