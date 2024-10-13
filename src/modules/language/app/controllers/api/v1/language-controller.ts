import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreateLanguageDto,
  GetLanguageParamDto,
  UpdateLanguageDto,
} from '../../../dtos/language-dto';
import { GetLanguageUsecase } from '../../../../domain/usecases/get-language-usecase';
import { UpdateLanguageUsecase } from '../../../../domain/usecases/update-language-usecase';
import { CreateLanguageUsecase } from '../../../../domain/usecases/create-language-usecase';

@ApiTags('Language')
@Controller({ path: 'api/user/v1/language' })
export class LanguageController {
  constructor(
    private readonly getLanguageUsecase: GetLanguageUsecase,
    private readonly updateLanguageUsecase: UpdateLanguageUsecase,
    private readonly createLanguageUsecase: CreateLanguageUsecase,
  ) {}

  /**
   * Create language
   */
  @Post()
  async create(@Body() body: CreateLanguageDto, @Res() res: Response) {
    const language = await this.getLanguageUsecase.call(undefined, body.name);
    if (language) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'This language is already exists' });
      return;
    }
    await this.createLanguageUsecase.call(body.name);
    res.status(HttpStatus.CREATED).json(language.toJson());
  }

  /**
   * Get by id
   */
  @Get('id/:language_id')
  async get(@Param() param: GetLanguageParamDto, @Res() res: Response) {
    const language = await this.getLanguageUsecase.call(
      param.language_id,
      undefined,
    );

    if (!language) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Language not found' });
      return;
    }

    res.json(language);
  }

  /**
   * Update language
   */
  @Put('id/:language_id')
  async update(
    @Param() param: GetLanguageParamDto,
    @Body() body: UpdateLanguageDto,
    @Res() res: Response,
  ) {
    const language = await this.getLanguageUsecase.call(
      param.language_id,
      undefined,
    );

    if (!language) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Language not found' });
      return;
    }

    await this.updateLanguageUsecase.call(language, body.name, new Date());
    res.status(HttpStatus.OK).json(true);
  }
}
