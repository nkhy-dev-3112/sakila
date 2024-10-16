export class ActorDto {
  actor_id!: number;

  first_name: string;

  last_name: string;
}

export class GetActorParamDto {
  actor_id!: number;
}

export class UpdateActorDto {
  first_name: string;

  last_name: string;
}

export class CreateActorDto {
  first_name: string;

  last_name: string;
}
