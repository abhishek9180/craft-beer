// Import Modules
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ name: 'highlight' })

/**
 * @name HighlightPipe
 * @description
 */
export class HighlightPipe implements PipeTransform {
    transform(text: string, search: string): any {
        let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        pattern = pattern.split(' ').filter((t) => {
            return t.length > 0;
        }).join('|'); // need to check join working
        let regex = new RegExp(pattern, 'gi');
        return search ? text ? text.toString().replace(regex, (match) => `<span class='highlight'>${match}</span>`) : text : text ;
    }
}
