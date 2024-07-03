import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../types/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly baseUrl = 'https://restcountries.com/v3.1/all';

  constructor(private httpClient: HttpClient) { }

  getAllCountries() {
    return this.httpClient.get<Country[]>(this.baseUrl);
  }
}
