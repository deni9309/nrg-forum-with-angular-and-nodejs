import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideComponent } from './aside/aside.component';
import { PostListComponent } from './post-list/post-list.component';
import { ThemeListItemComponent } from './theme-list-item/theme-list-item.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemesPageComponent } from './themes-page/themes-page.component';
import { ThemesRoutingModule } from './themes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeDetailsPageComponent } from './theme-details-page/theme-details-page.component';
import { ThemeNewPageComponent } from './theme-new-page/theme-new-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostEditComponent } from './post-edit/post-edit.component';



@NgModule({
    declarations: [
        ThemeListComponent,
        AsideComponent,
        ThemeListItemComponent,
        PostListComponent,
        ThemesPageComponent,
        ThemeDetailsPageComponent,
        ThemeNewPageComponent,
        PostEditComponent,
  ],
  imports: [
      CommonModule,
      ThemesRoutingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    exports: [
  ]
})
export class ThemesModule { }
