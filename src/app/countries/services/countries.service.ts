import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interface/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

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
        delay(2000)
      )
  }
  searchCapital( term:string ):Observable<Country[]>{
    const url:string = `${ this.apiUrl }/capital/${ term }`
    return this.getCountriesRequest(url)
  }

  searchCountry( term:string ):Observable<Country[]>{
    const url:string = `${ this.apiUrl }/name/${ term }`
    return this.getCountriesRequest( url )
  }

  searchRegion( region:string ):Observable<Country[]>{
    const url:string = `${ this.apiUrl }/region/${ region }`
    return this.getCountriesRequest( url )
  }

}
