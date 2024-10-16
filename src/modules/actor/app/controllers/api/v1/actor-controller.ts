import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { GetActorUsecase } from '../../../../domain/usecases/get-actor-usecase';
import { Response } from 'express';
import {
  CreateActorDto,
  GetActorParamDto,
  UpdateActorDto,
} from '../../../dtos/actor-dto';
import { GetActorListUsecase } from '../../../../domain/usecases/get-actor-list-usecase';
import { UpdateActorUsecase } from '../../../../domain/usecases/update-actor-usecase';
import { CreateActorUsecase } from '../../../../domain/usecases/create-actor-usecase';
import { DeleteActorUsecase } from '../../../../domain/usecases/delete-actor-usecase';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Actor')
@Controller({ path: 'api/actor/v1/me' })
export class ActorController {
  constructor(
    private readonly getActorUsecase: GetActorUsecase,
    private readonly getActorListUsecase: GetActorListUsecase,
    private readonly updateActorUsecase: UpdateActorUsecase,
    private readonly createActorUsecase: CreateActorUsecase,
    private readonly deleteActorUsecase: DeleteActorUsecase,
  ) {}

  /**
   * Get by id
   */
  @ApiOperation({ summary: 'Get an actor by their ID' })
  @ApiResponse({
    status: 200,
    description: 'Actor found',
    example: { id: 1, first_name: 'John', last_name: 'Doe' },
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found',
    example: { message: 'Actor not found' },
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
    example: 1,
  })
  @Get('id/:actor_id')
  async get(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(
      param.actor_id,
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Actor not found' });
      return;
    }

    res.json(actor.toJson());
  }

  /**
   * Get actor list
   */
  @ApiOperation({ summary: 'Get a list of all actors' })
  @ApiResponse({
    status: 200,
    description: 'Actor list found',
    example: [
      { id: 1, first_name: 'John', last_name: 'Doe' },
      { id: 2, first_name: 'Jane', last_name: 'Doe' },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Actor list not found',
    example: { message: 'Actor list not found' },
  })
  @Get('/')
  async getList(@Res() res: Response) {
    const actorList = await this.getActorListUsecase.call();

    if (!actorList) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Actor list not found' });
      return;
    }

    res.status(HttpStatus.OK).json(actorList?.map((actor) => actor.toJson()));
  }

  /**
   *  Update actor
   */
  @ApiOperation({ summary: 'Update an actor' })
  @ApiResponse({
    status: 200,
    description: 'Actor updated successfully',
    example: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found',
    example: { message: 'Actor not found' },
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
    example: 1,
  })
  @ApiBody({
    description: 'Actor update details',
    type: UpdateActorDto,
    schema: {
      example: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
  })
  @Put('id/:actor_id')
  async update(
    @Body() body: UpdateActorDto,
    @Param() param: GetActorParamDto,
    @Res() res: Response,
  ) {
    const actor = await this.getActorUsecase.call(
      param.actor_id,
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Actor not found' });
    }

    const result = await this.updateActorUsecase.call(
      actor,
      body.first_name,
      body.last_name,
    );
    res.status(HttpStatus.OK).json(result);
  }

  /**
   * Create actor
   */
  @ApiOperation({ summary: 'Create a new actor' })
  @ApiResponse({
    status: 201,
    description: 'Actor created successfully',
    example: { id: 1, first_name: 'John', last_name: 'Doe' },
  })
  @ApiBody({
    description: 'Actor details',
    type: CreateActorDto,
    schema: {
      example: {
        first_name: 'John',
        last_name: 'Doe',
      },
    },
  })
  @Post('/')
  async create(@Body() body: CreateActorDto, @Res() res: Response) {
    const actor = await this.createActorUsecase.call(
      body.first_name,
      body.last_name,
    );
    res.status(HttpStatus.OK).json(actor.toJson());
  }

  /**
   * Delete actor
   */
  @ApiOperation({ summary: 'Delete an actor' })
  @ApiResponse({
    status: 200,
    description: 'Actor deleted successfully',
    example: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found',
    example: { message: 'Actor not found' },
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
    example: 1,
  })
  @Delete('id/:actor_id')
  async delete(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(
      param.actor_id,
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Actor not found' });
      return;
    }
    const result = await this.deleteActorUsecase.call(actor);
    res.status(HttpStatus.OK).json(result);
  }
}
