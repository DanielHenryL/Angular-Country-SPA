import { Component, OnInit } from '@angular/core';
import { Country } from '../../interface/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interface/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries:Country[] = [];
  public regions: Region[] = ['Americas','Europe','Asia','Africa','Oceania'];
  public selectedRergion? :Region;
  public isLoading:boolean = false;

  constructor( private countriesService:CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRergion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region:Region ):void{
    this.isLoading = true;
    this.selectedRergion = region;
    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
