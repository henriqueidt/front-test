import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

class Film {
  public id: number
  public title: string
  public director: string
  public producer: string
  public release_date: string


  constructor (object) {
    this.id = object.id
    this.title = object.title
    this.director = object.director
    this.producer = object.producer
    this.release_date = object.release_date
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
      })
      .catch(error => console.log(error))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
