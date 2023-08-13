import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap } from 'rxjs';

import { ITheme } from '../../../core/interfaces';
import { ThemeService } from '../../../core/theme.service';

export interface L10n {
    [ key: string ]: { [ subKey: string ]: string }
}

@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: [ './theme-list.component.scss' ]
})
export class ThemeListComponent implements OnInit {
    l10n: L10n = {
        'en': {
            'no-themes-message': 'No Themes!'
        },
        'bg': {
            'no-themes-message': 'Няма намерени теми!'
        }
    }

    localize(key: string, l10n: L10n) {
        const local = 'bg';  //TODO: get real local from browsers settings
        return l10n[ local ][ key ];
    }


    themeList: ITheme[];

    searchControl = new FormControl();  //new FormControl('', { updateOn: 'blur' });

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(
            debounceTime(500),
            //filter(searchTerm => searchTerm.length >= 3),
            startWith(''),
            switchMap(searchTerm => this.themeService.loadThemeList(searchTerm)) //switches to the latest Observable and passes that along
        )
            .subscribe(themeList => { this.themeList = themeList; });
    }
}
