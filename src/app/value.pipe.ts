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

  public lang: string;

  constructor(
    private _g: GlobalsService
  ){
    this._g.getLanguage().subscribe(lang => {
      this.lang = lang;
    }, err => console.log(err));
  }

  transform(value: unknown, ...args: unknown[]): unknown {

    if(Array.isArray(value)){
      const match = value.find(v => v['@lang'] == this.lang);
      if(match && match['@value']){
        value = match['@value'];
      }
    }

    return value;
  }

}
