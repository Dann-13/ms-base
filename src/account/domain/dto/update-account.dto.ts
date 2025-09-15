import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString({ message: 'El código debe ser un texto' })
  code?: string;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;
}