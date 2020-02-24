import { Pipe, PipeTransform } from '@angular/core';
import { GlobalsService } from './globals.service';

export class Value{
  public '@value';
  public '@lang';

  constructor(value, lang){
    this['@value'] = value;
    this['@lang'] = lang;
  }
}

/**
 * Takes an array of {'@value': 'some value', '@lang': 'da'} format values and returns the desired language
 */

@Pipe({
  name: 'value'
})
export class ValuePipe implements PipeTransform {

  constructor(
    private g: GlobalsService
  ){}

  transform(value: unknown, ...args: unknown[]): unknown {

    // Get language from URL query param
    const urlParams = new URLSearchParams(window.location.search);
    var lang = urlParams.get('lang');

    // Default to danish
    if(!this.g.supportedLanguages.includes(lang)) lang = 'da';

    if(Array.isArray(value)){
      const match = value.find(v => v['@lang'] == lang);
      if(match && match['@value']){
        value = match['@value'];
      }
    }

    return value;
  }

}
