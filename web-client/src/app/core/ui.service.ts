import { Injectable } from '@angular/core';
import { IUser, NavTipe } from './interfaces';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private stateSource$$ = new BehaviorSubject<UIState>({
        currentUser: undefined,
        searchQuery: '',
        currentNavType: NavTipe.home,
        animated: true,
    });

    state$ = this.stateSource$$.asObservable();

    //selects
    selectUserIfAny$(): Observable<IUser | undefined> {
        return this.state$.pipe(map(state => state.currentUser));
    }

    selectSearchQuery$(): Observable<string> {
        return this.state$.pipe(map(state => state.searchQuery));
    }

    selectCurrentNavType$(): Observable<string> {
        return this.state$.pipe(map(state => state.currentNavType));
    }

    selectAnimated$(): Observable<boolean> {
        return this.state$.pipe(map(state => state.animated));
    }

    //actions
    detectCurrentUser(user: IUser | undefined): void {
        this.stateSource$$.next({
            ...this._getCurrentState(),
            currentUser: user,
        });
    }

    setNavItemAsActive(navItemType: NavTipe): void {
        this.stateSource$$.next({
            ...this._getCurrentState(),
            currentNavType: navItemType,
        });
    }

    setAnimated(isAnimated: boolean): void {
        this.stateSource$$.next({
            ...this._getCurrentState(),
            animated: isAnimated,
        });
    }

    search(keyword: string): void {
        this.stateSource$$.next({
            ...this._getCurrentState(),
            searchQuery: keyword,
        });
    }


    //current values
    userCurrentValue(): IUser | undefined {
        return this._getCurrentState().currentUser;
    }

    activeNavItemCurrentValue(): NavTipe {
        return this._getCurrentState().currentNavType;
    }

    animatedCurrentValue(): boolean {
        return this._getCurrentState().animated;
    }

    private _getCurrentState(): UIState {
        return this.stateSource$$.value;
    }

}

export interface UIState {
    //layers
    currentUser?: IUser | undefined;

    // filters
    searchQuery: string;

    // active navigation
    currentNavType: NavTipe

    //animated
    animated: boolean;
}