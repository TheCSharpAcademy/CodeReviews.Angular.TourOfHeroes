import { Component } from '@angular/core';
import {Hero} from '../hero'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroDetailComponent,RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  providers: [HeroService]

})
export class HeroesComponent {
   hero : Hero={
    id:1,
    name:'Windstorm',
  };
  heroes:Hero[]=[];
  selectedHero?: Hero;

  constructor(private heroService: HeroService, public messageService: MessageService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes=> this.heroes=heroes);
  }

  onSelect(hero:Hero):void {
    this.selectedHero=hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
