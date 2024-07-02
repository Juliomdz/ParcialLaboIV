type TipoPelicula = 'Terror' | 'Comedia' | 'Amor' | 'Otros';

export interface Pelicula {
  id: number; 
  nombre: string;
  tipo: TipoPelicula;
  fechaDeEstreno: Date; 
  cantidadDePublico: number;
  foto: string;
}


export interface MovieResponse {
  dates:         Dates;
  page:          number;
  results:       Movie[];
  total_pages:   number;
  total_results: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface Movie {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  genre_names?: string[];
  id:                number;
  original_language: OriginalLanguage;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Ko = "ko",
}

