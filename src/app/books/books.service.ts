import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface IBook {
  id?: string;
  name: string;
  author: string;
  publisher: string;
  releaseDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private dbPath = '/books';

  booksRef: AngularFirestoreCollection<IBook>;

  constructor(private db: AngularFirestore) {
    this.booksRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IBook> {
    return this.booksRef;
  }

  create(book: IBook): any {
    return this.booksRef.add({ ...book });
  }

  update(id: string, data: any): Promise<void> {
    delete data.id;
    return this.booksRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.booksRef.doc(id).delete();
  }
}
