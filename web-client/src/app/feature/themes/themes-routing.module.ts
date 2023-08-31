import { RouterModule, Routes } from "@angular/router";

import { ThemesPageComponent } from "./themes-page/themes-page.component";
import { ThemeDetailsPageComponent } from "./theme-details-page/theme-details-page.component";
import { ThemeNewPageComponent } from "./theme-new-page/theme-new-page.component";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { PostEditComponent } from "./post-edit/post-edit.component";

const router: Routes = [
    {
        path: '',
        component: ThemesPageComponent,
    },
    {
        path: 'new',
        canActivate: [ AuthGuard ],
        component: ThemeNewPageComponent,
    },
    {
        path: ':themeId/posts/:postId',
        canActivate: [ AuthGuard ],
        component: PostEditComponent,
    },
    {
        path: ':themeId',
        component: ThemeDetailsPageComponent,
    },
];

export const ThemesRoutingModule = RouterModule.forChild(router);