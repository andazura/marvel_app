import { Component, OnInit } from '@angular/core';
import { MarvelserviceService } from 'src/app/services/marvelservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroes:any;
  vermodal=false;
  comic = {
    title: "",
    description:"",
    imagen:""
  }
  constructor(private service :MarvelserviceService) { 
    this.service.getAllHeroes().subscribe(res =>{
      const tmp_hereos:any = Object.entries(res);
      this.heroes = tmp_hereos[6][1].results;
      console.log(this.heroes)
    })
    
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
      this.comic.imagen = comic[6][1].results[0].images[0].path+comic[6][1].results[0].images[0].extension;
      console.log(comic)
    }

    );
    this.vermodal = true;
  }
}
