import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

class Character {
  public name: string
  public height: string
  public mass: string
  public eye_color: string

  constructor (object) {
    this.name = object.name
    this.height = object.height
    this.mass = object.mass
    this.eye_color = object.eye_color
  }
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  private sub: any
  public id: number
  public character: Character

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']
    })
    this.checkCharacter()
  }

  checkCharacter(): void {
    this.data.getCharacter(`https://swapi.co/api/people/${this.id}/`)
    .then(response => {
      this.character = new Character(response)
    })
    .catch(error => console.log(error))
  }
}
