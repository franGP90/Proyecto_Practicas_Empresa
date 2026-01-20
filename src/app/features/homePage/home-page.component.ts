import { Component, effect } from '@angular/core';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { HeadderComponent } from '../../components/headder-component/headder-component.component';
@Component({
  selector: 'app-home-page',
  imports: [BookCatalogComponent, HeadderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  protected searchTerm: string = '';
  onSearch(term: string) {
    this.searchTerm = term;
    console.log('Search term updated in HomePageComponent:', this.searchTerm);
  }
}