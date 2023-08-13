import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './feature/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './feature/pages/not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'themes',
        loadChildren: () => import('./feature/themes/themes.module').then(m => m.ThemesModule)
    },
    {
        path: 'error',
        component: NotFoundPageComponent
    },
    // {
    //     path: '**',
    //     component: NotFoundPageComponent
    // },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled'
    }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
