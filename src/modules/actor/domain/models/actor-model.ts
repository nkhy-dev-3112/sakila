import { FilmModel } from '../../../film/domain/models/film-model';

export class ActorModel {
  public readonly actorId: number;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly lastUpdate: Date;

  public readonly films: FilmModel[];

  constructor(
    actorId: number,
    firstName: string,
    lastName: string,
    lastUpdate: Date,
    films: FilmModel[] | undefined,
  ) {
    this.actorId = actorId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastUpdate = lastUpdate;
    this.films = films;
  }

  public toJson(): Record<string, any> {
    return {
      actor_id: this.actorId,
      first_name: this.firstName,
      last_name: this.lastName,
      last_update: this.lastUpdate,
      films: this.films?.map((film) => film?.toJson()),
    };
  }
}
