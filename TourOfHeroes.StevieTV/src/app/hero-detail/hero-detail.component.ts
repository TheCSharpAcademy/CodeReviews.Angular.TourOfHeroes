import { Component, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf, UpperCasePipe } from "@angular/common";
import { Hero } from "../hero";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        UpperCasePipe
    ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})

export class HeroDetailComponent {
  @Input() hero?: Hero;
}
