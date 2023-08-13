import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { TimeSpanPipe } from './pipes/time-span.pipe';


@NgModule({
    declarations: [
        WelcomeComponent,
        TimeSpanPipe,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        WelcomeComponent,
        TimeSpanPipe,
    ]
})
export class SharedModule { }
