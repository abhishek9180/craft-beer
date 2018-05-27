import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';

import { BeerItemsComponent } from './components/beer-items.component';




export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: BeerItemsComponent,
	},
	{
		path: '**',
		redirectTo: '/home'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
  })

export class AppRoutingModule {
	constructor(private router: Router) {

	}

}