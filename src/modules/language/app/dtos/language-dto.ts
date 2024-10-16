export class LanguageDto {
  language_id: number;

  name: string;
}

export class UpdateLanguageDto {
  name: string;
}

export class CreateLanguageDto {
  name: string;
}

export class GetLanguageParamDto {
  language_id!: string;
}
