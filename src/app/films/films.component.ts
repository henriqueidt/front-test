import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { forEach } from '@angular/router/src/utils/collection';

class Film {
  public id: number
  public title: string
  public director: string


  constructor (object) {
    this.id = object.episode_id
    this.title = object.title
    this.director = object.director
  }
}

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  film: Film;

  films = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.checkFilms();
  }

  checkFilms(): void {
    this.data.getFilms()
      .then(response => {
        console.log(response)
        response.results.forEach((item) => {
        this.film = new Film(item)
        this.film.id = this.film.id
        this.film.title = this.film.title
        this.film.director = this.film.director
        this.films.push(this.film)
        })
      })
      .catch(error => console.log(error))
  }

}