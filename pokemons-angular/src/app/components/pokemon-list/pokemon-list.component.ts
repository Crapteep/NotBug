import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons: any[] = [];
  currentPage: number = 1;
  limit: number = 20;
  totalPokemons: number = 0;
  isLoading: boolean = false;

  constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'];
      this.currentPage = page ? Number(page) : 1;
      this.fetchPokemons();
    });
  }

  fetchPokemons(): void {
    this.isLoading = true;
    const offset = (this.currentPage - 1) * this.limit;
    console.log(`Fetching Pokémon data with offset: ${offset} and limit: ${this.limit}`);
  
    this.pokemonService.getPokemonList(offset, this.limit).subscribe((data: any) => {
      console.log('Fetched Pokémon data:', data);
      this.pokemons = data.results;
      this.totalPokemons = data.count;
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching Pokémon data:', error);
      this.isLoading = false;
    });
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.router.navigate([], { queryParams: { page: this.currentPage }, queryParamsHandling: 'merge' });
    this.fetchPokemons();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/pokemon', id], { queryParams: { page: this.currentPage } });
  }

  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.limit);
  }
}
