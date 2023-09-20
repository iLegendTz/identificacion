import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static maxDateToday(control: AbstractControl) {
        const value = control.value;
        const today = new Date().toISOString().split("T")[0];

        if (value > today) {
            return { invalidDate: true }
        }
        return null;
    }
}