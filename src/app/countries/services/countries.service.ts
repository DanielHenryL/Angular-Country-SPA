import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interface/country.interface';
import { CacheStore } from '../interface/cache-store.interface';
import { Region } from '../interface/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region:'', countries: []}
  }

  constructor(private http: HttpClient) { }

  searchCapitalByAlphaCode( code:string ):Observable<Country|null>{
    const url:string = `${ this.apiUrl }/alpha/${ code }`
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null),
        catchError( error => of(null))
      )
  }
  private getCountriesRequest( url:string ):Observable<Country[]>{
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( error => of([])),
        // delay(2000)
      )
  }
  searchCapital( term:string ):Observable<Country[]>{
    const url:string = `${ this.apiUrl }/capital/${ term }`
    return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byCapital = { term, countries})
        )
  }

  searchCountry( term:string ):Observable<Country[]>{
    const url:string = `${ this.apiUrl }/name/${ term }`
    return this.getCountriesRequest( url )
        .pipe(
          tap( countries => this.cacheStore.byCountries = { term, countries })
        )
  }

  searchRegion( region:Region ):Observable<Country[]>{
    const url:string = `${ this.apiUrl }/region/${ region }`
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries })
      )
  }

}
