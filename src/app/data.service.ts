import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEventPattern } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getFilms(): Promise<any> {
    return this.http.get('https://swapi.co/api/films/')
    .toPromise()
    .then(response => response)
    .catch(error => console.log(error))
  }

  getFilm(id): Promise<any> {
    return this.http.get(`https://swapi.co/api/films/${id}`)
    .toPromise()
    .then(response => response)
    .catch(error => console.log(error))
  }

}
