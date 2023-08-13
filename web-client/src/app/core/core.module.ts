import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { storageServiceProvider } from './storage.service';
import { PostService } from './post.service';
import { ThemeService } from './theme.service';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProvider } from './auth.interceptor';
import { SharedModule } from '../shared/shared.module';
import { errorHandlerInterceptorProvider } from './error-handler.interceptor';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ],
    providers: [ ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                UserService,
                ThemeService,
                storageServiceProvider,
                PostService,
                authInterceptorProvider,
                errorHandlerInterceptorProvider,
            ],
        };
    }
}
