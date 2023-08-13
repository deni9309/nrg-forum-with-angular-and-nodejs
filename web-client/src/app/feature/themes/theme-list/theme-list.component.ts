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
