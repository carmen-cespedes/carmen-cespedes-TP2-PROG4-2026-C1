import { IsString, IsEmail, IsOptional, IsIn, MinLength, Matches } from 'class-validator';

export class UsuarioRegistroDTO {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  fechaNacimiento: string;

  @IsString()
  descripcion: string;

  @IsEmail()
  email: string;

  @IsString()
  nombreUsuario: string;

  @IsString()
  @MinLength(8, { message: 'La contrasena debe tener al menos 8 caracteres' })
  @Matches(/[A-Z]/, { message: 'Debe tener al menos una mayúscula' })
  @Matches(/[0-9]/, { message: 'Debe tener al menos un número' })
  contrasena: string;

  @IsOptional()
  @IsString()
  @IsIn(['usuario', 'administrador'])
  perfil?: string;
}

export class UsuarioLoginDTO {
  @IsString()
  identifier: string;   // acepta email O nombreUsuario

  @IsString()
  contrasena: string;
}