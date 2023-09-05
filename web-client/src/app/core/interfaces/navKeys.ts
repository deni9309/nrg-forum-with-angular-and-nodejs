export interface INavItemType {
    displayName: string;
    typeKey: NavTipe;
}

export enum NavTipe {
    login = 'login',
    logout = 'logout',
    register = 'register',
    profile = 'profile',
    home = 'home',
    themes = 'themes',
    newTheme = 'newTheme',
    notFound = 'notFound',
}

