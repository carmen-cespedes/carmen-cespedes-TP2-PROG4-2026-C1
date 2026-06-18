import { IsString } from 'class-validator';

export class CrearComentarioDTO {
  @IsString()
  mensaje: string;
}

export class EditarComentarioDTO {
  @IsString()
  mensaje: string;
}