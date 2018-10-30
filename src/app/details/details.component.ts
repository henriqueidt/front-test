import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

class Film {
  public id: number
  public title: string
  public director: string
  public producer: string
  public release_date: string
  public opening_crawl: string
  public characters: Array<string>


  constructor (object) {
    this.id = object.id
    this.title = object.title
    this.director = object.director
    this.producer = object.producer
    this.release_date = object.release_date
    this.opening_crawl = object.opening_crawl
    this.characters = object.characters
  }
}

class Character {
  public name: string
  public url: string
  public id: number

  constructor (object) {
    this.name = object.name
    this.url = object.url
    this.id = object.id
  }
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  film: Film;
  character: Character
  characterLinks = [];
  characters = [];

  constructor(private data: DataService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      switch (this.id) {
        case 1:
        case 2:
        case 3:
          this.id = this.id + 3;
          break;
        case 4:
        case 5:
        case 6:
          this.id = this.id -3;
          break;
        default:
          break;
      }
    })

    this.checkDetails();
   }

  checkDetails(): void {
    this.data.getFilm(this.id)
      .then(response => {
          this.film = new Film(response)
          this.characterLinks = this.film.characters
          this.checkCharacters(this.characterLinks)
      })
      .catch(error => console.log(error))
  }

  checkCharacters(links): void {
    let i, j = 0;
    for (i = 0; i < links.length; i++){
      this.data.getCharacter(links[i])
      .then(response => {
        this.character = new Character(response)
        let id = this.character.url.split('/')
        this.character.id = parseInt(id[5])
        this.characters.push(this.character)
      })
      .catch(error => console.log(error))
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
