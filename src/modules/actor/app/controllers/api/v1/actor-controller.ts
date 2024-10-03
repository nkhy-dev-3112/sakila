import { Controller, Get, Param, Res } from '@nestjs/common';
import { GetActorUsecase } from '../../../../domain/usecases/get-actor-usecase';
import { Response } from 'express';
import { GetActorParamDto } from '../../../dtos/actor-dto';
import { GetActorListUsecase } from '../../../../domain/usecases/get-actor-list-usecase';

@Controller({ path: 'api/actor/v1/me' })
export class ActorController {
  constructor(
    private readonly getActorUsecase: GetActorUsecase,
    private readonly getActorListUsecase: GetActorListUsecase,
  ) {}

  /**
   * Get by id
   */
  @Get('id/:actor_id')
  async get(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(param.actor_id);

    if (!actor) {
      res.status(400).json({ message: 'Actor not found' });
      return;
    }

    res.json(actor.toJson());
  }

  /**
   * Get actor list
   */

  @Get('/')
  async getList(@Res() res: Response) {
    const actorList = await this.getActorListUsecase.call();

    if (!actorList) {
      res.status(400).json({ message: 'Actor list not found' });
      return;
    }

    res.json(actorList.map((actor) => actor.toJson()));
  }
}