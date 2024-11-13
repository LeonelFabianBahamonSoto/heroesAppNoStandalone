import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/heroes.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})

export class SearchPageComponent
{
  searchInput = new FormControl<string>('');
  heroes: Hero[] = [];

  constructor( private heroesService: HeroesServices ) {};

  searchHero = () => {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions( value )
      .subscribe( heroes => {console.info( heroes ); this.heroes = heroes });
  };

}