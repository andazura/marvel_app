import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
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
  limit = 10;
  offset = 0;
  modo_busqueda:boolean=false;
  comic = {
    id:"",
    title: "",
    description:"",
    imagen:""
  }
  constructor(private service :MarvelserviceService) { 
    
    this.recuperaStorage();
    this.getAllHeroes(this.limit,this.offset)  
  }

  getAllHeroes(limit:number,offset:number){
    this.offset = offset;
    this.service.getAllHeroes(limit,offset).subscribe(res =>{
      const tmp_hereos:any = Object.entries(res);
      if(tmp_hereos[0][1] != 200){
        Swal.fire('Oops...', 'Erro al Obtener la informacion', 'error')
      }
      this.heroes = tmp_hereos[6][1].results;
      console.log(this.heroes)
    })
  }
  
  recuperaStorage(){
    this.comics_fav = [];
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
  buscarHeroe(termino:string,limit:number,offset:number){
    if(termino.length > 3){
      this.modo_busqueda = true
      this.service.buscarHeroes(termino,limit,offset).subscribe(res =>{
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
      Swal.fire('Oops...', 'Este comic ya esta en tu lista de favoritos', 'warning')
        return (false);
    }
  
    let comic_tmp = {
      id:comic.id,
      titulo:comic.title,
      imagen:comic.imagen
    }
    Swal.fire(
      'Se agrego el Comic a tu lista',
      'Comic agregado '+comic.title,
      'success'
    )
    this.vermodal = false;
    this.comics_fav.push(comic_tmp);
    localStorage.setItem("comics_fav"+id,JSON.stringify(comic_tmp));
    return true
  }

  eliminar_comic(id_comic:String){
    Swal.fire({
      title: 'Seguro que desea eliminar el comic de su lista?',
      text: 'Esta accion no se puede reversar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("comics_fav"+id_comic);
        this.recuperaStorage();
        Swal.fire(
          'Comic Eliminado!',
          'Se ha eliminado el comic pero te juro que lo vengaremos',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu comic esta a salvo en tu lista',
          'error'
        )
      }
    })
    
   
  }
}

