import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {
    transform(dateString: string): string {

        return moment(dateString).fromNow();
    }
}
