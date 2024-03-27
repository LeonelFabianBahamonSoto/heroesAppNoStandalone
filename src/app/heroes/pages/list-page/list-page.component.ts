import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

import { HeroesServices } from '../../services/heroes.service';

@Component({
  selector:    'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls:   ['./list-page.component.sass']
})

export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor( private heroService: HeroesServices ) {};

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe( heroesList => {
        console.info( 'heroesList: ', heroesList );
        this.heroes = heroesList
      });
  }

}