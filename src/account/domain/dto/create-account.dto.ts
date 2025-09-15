import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString({ message: 'El código debe ser un texto' })
  code: string;

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;
}