import { Component } from '@angular/core';
import { Country } from '../../interface/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interface/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries:Country[] = [];
  public regions: Region[] = ['Americas','Europe','Asia','Africa','Oceania'];
  public selectedRergion? :Region;

  constructor( private countriesService:CountriesService ){}

  searchByRegion( region:Region ):void{
    this.selectedRergion = region;
    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}
