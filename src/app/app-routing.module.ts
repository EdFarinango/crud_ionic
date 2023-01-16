import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['create-reg']);

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
		...canActivate(redirectLoggedInToHome)
	},
	{
		path: 'create-reg',
		loadChildren: () => import('./pages/create-reg/create-reg.module').then((m) => m.CreateRegPageModule),
		...canActivate(redirectUnauthorizedToLogin)
	},
  {
    path: 'list-reg',
    loadChildren: () => import('./pages/list-reg/list-reg.module').then( (m) => m.ListRegPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'edit-reg/:id',
    loadChildren: () => import('./pages/create-reg/create-reg.module').then( (m) => m.CreateRegPageModule),
	...canActivate(redirectUnauthorizedToLogin)
  },
	
  

	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	},
  
  
 
  
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})
export class AppRoutingModule {}