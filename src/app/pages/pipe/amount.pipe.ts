import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    
    // Convertit en nombre si c'est une chaîne
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    // Formate le nombre
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
