import { FilmRating } from '../../domain/enums/film-rating';

export class FilmDto {
  film_id!: number; // New property for film ID

  title: string; // New property for film title

  description?: string; // Optional property for film description

  release_year?: number; // Optional property for release year

  language_id!: number; // New property for language ID

  original_language_id?: number; // Optional property for original language ID

  rental_duration!: number; // New property for rental duration

  rental_rate!: number; // New property for rental rate

  length?: number; // Optional property for film length

  replacement_cost!: number; // New property for replacement cost

  rating?: string; // Optional property for film rating

  last_update!: Date; // New property for last update

  special_features?: string[]; // Optional property for special features

  fulltext?: string; // Optional property for fulltext
}

export class GetFilmParamDto {
  film_id!: number;
}

export class CreateFilmActorParamDto {
  film_id!: number;

  actor_id!: number;
}

export class UpdateFilmDto {
  title: string;

  description?: string;

  release_year?: number;

  language_id!: number;

  original_language_id?: number;

  rental_duration!: number;

  rental_rate!: number;

  length?: number;

  replacement_cost!: number;

  rating?: FilmRating;

  last_update!: Date;

  special_features?: string[];

  fulltext?: string;
}
