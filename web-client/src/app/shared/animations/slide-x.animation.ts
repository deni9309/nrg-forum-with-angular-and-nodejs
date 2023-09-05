import { animate, animation, keyframes, state, style, transition, trigger } from "@angular/animations";
import { SLIDE_X_DEFAULT_DELAY, SLIDE_X_DEFAULT_TIMING } from '../constants';

/**
 * Right-to-left horizontal slide in animation
 * @param {string} [timing=defaultValue] Duration in seconds (default is 0.7s)
 * @param {string} [delay=defaultValue] Animation delay in seconds (default is 0.9s) 
*/
export const slideInX = animation(
    animate(
        '{{timing}}s {{delay}}s ease-in-out',
        keyframes([
            style({ opacity: 0, transform: 'translateX(20%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ])
    ),
    { params: { timing: SLIDE_X_DEFAULT_TIMING, delay: SLIDE_X_DEFAULT_DELAY } }
);

/**
 * Right-to-left horizontal slide out animation
 * @param {string} [timing=defaultValue] Duration in seconds (default is 0.7s)
 * @param {string} [delay=defaultValue] Animation delay in seconds (default is 0) 
*/
export const slideOutX = animation(
    animate(
        '{{timing}}s {{delay}}s ease-in-out',
        keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0, transform: 'translateX(20%)', offset: 1 }),
        ])
    ),
    { params: { timing: SLIDE_X_DEFAULT_TIMING, delay: 0 } }
);