import { IsString, IsOptional } from 'class-validator';

export class CrearPublicacionDTO {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  imagen?: string;
}