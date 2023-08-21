import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';

import { ITheme } from '../../../core/interfaces';
import { ThemeService } from '../../../core/theme.service';
import { PAGE_SIZE } from 'src/app/shared/constants/layoutSpecifics';

@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: [ './theme-list.component.scss' ]
})
export class ThemeListComponent implements OnInit {

    themeList: ITheme[];

    searchControl = new FormControl();
    title: string;

    readonly pageSize = PAGE_SIZE;
    currentPage = 0;
    isActive = true;

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
      
        this.searchControl.valueChanges.pipe(
            debounceTime(500),
            startWith(''),
            switchMap(searchTerm => this.themeService.loadThemeList(searchTerm)) //switches to the latest Observable and passes it along
        )
            .subscribe(themeList => { this.themeList = themeList; });
    }
}
