import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { anime } from 'src/app/models/anime';
import { AnimeFirebaseService } from 'src/app/services/animes-firebase.service';

@Component({
  selector: 'app-lista-de-animes',
  templateUrl: './lista-de-animes.component.html',
  styleUrls: ['./lista-de-animes.component.scss']
})
export class ListaDeAnimesComponent implements OnInit {
  public lista_animes : anime[] = [];

  constructor(private _router : Router, private animeService : AnimeFirebaseService) { }

  ngOnInit(): void {
    this.animeService.getAnimes().subscribe(res =>{
      this.lista_animes = res.map(e => {
        return {
          id : e.payload.doc.id,
          ...e.payload.doc.data() as anime
        }as anime;
      })
    })
  }

  public excluir(anime : anime)
  {
    let resultado = confirm("Realmente deseja excluir o anime de seu repositório" + anime.name + "?");

    if(resultado){
     this.animeService.deleteAnime(anime)
     .then(() => { alert ("Anime excluído com sucesso!")})
     .catch(() => { alert ("Erro ao excluir anime")})
    }
  }

  public editar(anime : anime) : void
  {
    this._router.navigate(["/editarAnime", anime.id]);
  }

  public irParaCriarAnime()
  {
    this._router.navigate(["/criarAnime"]);
  }

}
