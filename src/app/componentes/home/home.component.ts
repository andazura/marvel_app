import { Component, OnInit } from '@angular/core';
import { MarvelserviceService } from 'src/app/services/marvelservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroes:any;
  comics_fav:any[] = [];
  vermodal=false;
  comic = {
    id:"",
    title: "",
    description:"",
    imagen:""
  }
  constructor(private service :MarvelserviceService) { 
    this.recuperaStorage();
    this.service.getAllHeroes().subscribe(res =>{
      const tmp_hereos:any = Object.entries(res);
      this.heroes = tmp_hereos[6][1].results;
      console.log(this.heroes)
    })
    
  }
  
  recuperaStorage(){
    var tmp = Object.keys(localStorage);
    tmp.forEach(elem => {
      if(elem.indexOf("comics_") >= 0){
        var comic_:any= localStorage.getItem(elem);
        comic_ = JSON.parse(comic_)
        this.comics_fav.push(comic_)
      }
    })
    console.log(this.comics_fav)
  }
  buscarHeroe(termino:string){
    if(termino.length > 3){
      this.service.buscarHeroes(termino).subscribe(res =>{
        const tmp_hereos:any = Object.entries(res);
        this.heroes = tmp_hereos[6][1].results;
        console.log(this.heroes)
      })
    }
  }

  ngOnInit(): void {
  }
  modal(url:String){
    this.service.detalleComic(url).subscribe(res =>{
      const comic:any = Object.entries(res);
      this.comic = comic[6][1].results[0];
      this.comic.imagen = comic[6][1].results[0].images[0].path+"/portrait_fantastic."+comic[6][1].results[0].images[0].extension;
    }

    );
    this.vermodal = true;
  }

  agregarComicFav(comic:any){
    
    let id:string = comic.id;
    let storage:any = localStorage.getItem("comics_fav"+id);
    if(storage !== null){
        console.log("Este commit ya existe")
        return (false);
    }
  
    let comic_tmp = {
      id:comic.id,
      titulo:comic.title,
      imagen:comic.imagen
    }
    this.comics_fav.push(comic_tmp);
    localStorage.setItem("comics_fav"+id,JSON.stringify(comic_tmp));
    return true
  }
}

