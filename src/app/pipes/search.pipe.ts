import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[] | null, searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items || [];
    }
    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      return item.name.toLowerCase().includes(searchTerm) || 
             item.species.toLowerCase().includes(searchTerm) ||
             item.age.toString().includes(searchTerm) ||
             item.color.toLowerCase().includes(searchTerm);
    });
  }
}