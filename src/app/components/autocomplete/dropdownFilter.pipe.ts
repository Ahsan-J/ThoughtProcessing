import { Pipe, PipeTransform } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.types';

@Pipe({
    name: 'dropdownFilter',
    standalone: false
})
export class DropdownItemFilterPipe implements PipeTransform {

  private matchItems(value: string, matching: string): boolean {
    return value.toLowerCase().includes(matching.toLowerCase())
  }

  transform<T extends { [key: string]: IDropdownItem } | undefined>(options: T, searchText: string): T {
    return Object.keys(options || {}).reduce<T>((result, key: string) => {
      const value: IDropdownItem | undefined = options?.[key];

      if(result && value && (this.matchItems(key, searchText) || this.matchItems(value.label, searchText))) {
        result[key] = value;
      }

      return result
    }, {} as T)
  }

}
