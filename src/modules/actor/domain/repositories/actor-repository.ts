import { ActorModel } from '../models/actor-model';

export abstract class ActorRepository {
  public abstract create(actor: ActorModel): Promise<void>;
  public abstract update(
    actor: ActorModel,
    firstName: string | undefined,
    lastName: string | undefined,
    lastUpdate: Date,
  ): Promise<void>;

  public abstract get(actorId: number): Promise<ActorModel | undefined>;
  public abstract getList(): Promise<ActorModel[] | undefined>;
}