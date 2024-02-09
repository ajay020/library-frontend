export interface CatalogDetail {
  author_count: number;
  book_count: number;
  book_instance_available_count: number;
  book_instance_count: number;
  genre_count: number;
}

export interface Author {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth?: Date;
  date_of_death?: Date;

  __v: number;
}

export interface Genre {
  _id: string;
  name: string;
  checked?: boolean;
}

export interface Book {
  _id: string;
  title: string;
  author: Author;
  summary: string;
  isbn: string;
  genre: Genre[];
}

export interface BookInstace {
  _id: string;
  book: Book;
  imprint: string;
  isbn: string;
  status: string[];
  due_back: Date;
}
