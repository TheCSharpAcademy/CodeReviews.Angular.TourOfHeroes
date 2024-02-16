import { AsyncPipe, NgForOf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) {}

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), // waits 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignores new term if it hasn't changed
      switchMap((term: string) => this.heroService.searchHeros(term)), // switch to a new search observable on change
    );
  }

}
