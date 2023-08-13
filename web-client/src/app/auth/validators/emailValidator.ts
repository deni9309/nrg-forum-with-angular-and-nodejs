import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(domainsConfig?: string[]): ValidatorFn {
    let domains;
    if (domainsConfig) {
        domains = domainsConfig.join('|')
    }
    const regExp = new RegExp(`[^@]{6,}@gmail\.(${domains ? domains : 'com'})$`);

    return (control) => {
        // if (control.errors && Object.keys(control.errors).filter(e => e !== 'emailValidator').length > 0) {
        //     return null;
        // }

        return control.value === '' || regExp.test(control.value)
            ? null
            : { emailValidator: true }
    };
}