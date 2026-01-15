import { Component } from '@angular/core';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
@Component({
  selector: 'app-home-page',
  imports: [BookCatalogComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
