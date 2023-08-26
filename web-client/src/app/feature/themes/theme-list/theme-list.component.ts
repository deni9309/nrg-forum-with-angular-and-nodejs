import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, startWith, switchMap, tap } from 'rxjs';

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
    searchControl = new FormControl('');

    private pageChange$$ = new BehaviorSubject(undefined);
    private pageReset$$ = new BehaviorSubject(0);

    readonly pageSize = PAGE_SIZE;

    currentPage = 0;
    totalResultsCount: number;

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        this.currentPage = 0;

        combineLatest([
            this.searchControl.valueChanges.pipe(    //if search input changes-> make request
                debounceTime(500),
                startWith('')
            ),
            this.pageChange$$,    //if page changes-> make request
            this.pageReset$$,
        ]).pipe(
            tap(([ _s, _a, pageReset ]) => this.fnPageReset(pageReset)),
            switchMap(([ searchTerm ]) =>
                this.themeService.loadThemePaginatedList(   //switches to the latest Observable and passes it along
                    searchTerm,
                    this.currentPage * this.pageSize,
                    this.pageSize
                )
            ))
            .subscribe(themes => {
                this.themeList = themes.results;
                this.totalResultsCount = themes.totalResultsCount;
            });
    }

    goToPreviousPage(): void {
        this.currentPage--;
        this.pageChange$$.next(undefined);  //triggers the request again
    }

    goToNextPage(): void {
        this.currentPage++;
        this.pageChange$$.next(undefined);  //triggers the request again
    }

    fnPageReset(n: number) {
        this.searchControl.valueChanges.subscribe(value => {
            if (value) {
                this.currentPage = n;
            }
        });
    }

    //example: total 9; pageSize 4; page1: 1-4, page2: 5-8, page3: 9  //when on page3: 3*4 >= 9 =>true, so next is disabled
    isNextButtonDisabled(): boolean {
        return (this.currentPage + 1) * this.pageSize >= this.totalResultsCount;
    }

    themeTrackBy(index: number, theme: ITheme) {
        return theme._id;
    }
}
