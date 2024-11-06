import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      switchMap((data) => {
        const requests = data.results.map((pokemon: any) => this.http.get(pokemon.url));
        return forkJoin(requests).pipe(
          switchMap(pokemonDetails => {
            return [{
              results: pokemonDetails,
              count: data.count
            }];
          })
        );
      })
    );
  }

  getPokemonDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }
}
