import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { PagesModule } from './feature/pages/pages.module';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { IRootState, currentUserReducer } from './+store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        CoreModule.forRoot(),  //provide this module with providers
        AppRoutingModule,
        PagesModule,
        StoreModule.forRoot<IRootState>({
            currentUser: currentUserReducer
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (authService: AuthService) => {
                return () => authService.authenticate$();
            },
            deps: [ AuthService ],
            multi: true,
        }
    ],
    bootstrap: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ]
})
export class AppModule { }
