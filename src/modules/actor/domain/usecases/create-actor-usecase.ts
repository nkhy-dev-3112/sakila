import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';

@Injectable()
export class CreateActorUsecase {
  constructor(private readonly actorRepository: ActorRepository) {}

  public async call(firstName: string, lastName: string) {
    const now = new Date();
    const maxActorId = await this.actorRepository.getMaxId();

    const actor = new ActorModel(
      maxActorId + 1,
      firstName,
      lastName,
      now,
      undefined,
    );
    await this.actorRepository.create(actor);

    return actor;
  }
}
