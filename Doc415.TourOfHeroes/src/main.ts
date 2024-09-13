import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/in-memory-data.service';
import { AppComponent } from './app/app.component';
import { HeroesComponent } from './app/heroes/heroes.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { HeroDetailComponent } from './app/hero-detail/hero-detail.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: 'heroes', component: HeroesComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'detail/:id', component: HeroDetailComponent }
      ]),
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
    )
  ]
}).catch(err => console.error(err));
