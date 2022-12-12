import { PublisherTypeaheadComponent } from './../publisher-typeahead/component';
import { map } from 'rxjs/operators';
import { LoaderService } from './../loader.service';
import { Observable, switchMap, tap } from 'rxjs';
import { BooksService, IBook } from './books.service';
import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthorTypeaheadComponent } from '../author-typeahead/component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books$: Observable<IBook[] | null> = this.booksService
    .getAll()
    .valueChanges({ idField: 'id' })
    .pipe(
      map((data) => {
        if (data && data.length > 0) {
          return data;
        } else {
          return null;
        }
      }),
      tap((d) => {
        this.loaderService.hide(this.inintLoader);
      })
    );
  inintLoader: number;
  constructor(
    public loaderService: LoaderService,
    private booksService: BooksService
  ) {
    this.inintLoader = this.loaderService.show();
  }

  isEdit = false;

  editBook: IBook = {
    name: '',
    author: '',
    id: '',
    releaseDate: '',
    publisher: '',
  };

  async deleteBook(book: IBook) {
    if (book && book.id) {
      const isConfirm = confirm('Are you Sure!Do you want to delete Book?');
      if (isConfirm) {
        const loader = this.loaderService.show();
        await this.booksService.delete(book.id);
        this.loaderService.hide(loader);
      }
    }
  }

  showEditModal(book: IBook, editBookModal: ModalDirective, isEdit = true) {
    this.isEdit = isEdit;
    this.editBook = { ...book };
    editBookModal.show();
  }

  async saveEdit(
    editBookModal: ModalDirective,
    authorTypeAhead: AuthorTypeaheadComponent,
    publisherTypeAhead: PublisherTypeaheadComponent,
  ) {
    await authorTypeAhead.save();
    await publisherTypeAhead.save();
    if (this.isEdit && this.editBook.id) {
      const loader = this.loaderService.show();
      this.booksService.update(this.editBook.id, this.editBook);
      this.loaderService.hide(loader);
      editBookModal.hide();
    } else {
      const loader = this.loaderService.show();
      this.booksService.create(this.editBook);
      this.loaderService.hide(loader);
      editBookModal.hide();
    }
  }
}
