import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'hero-heroes-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})

export class CardComponent implements OnInit
{
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if( !this.hero ) throw Error( 'La propiedad de herore es requerida' );
  }
}