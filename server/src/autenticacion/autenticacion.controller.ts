import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, Request, UploadedFiles } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AutenticacionService } from './autenticacion.service';
import { UsuarioRegistroDTO, UsuarioLoginDTO } from './usuarios.dto';
import { TokenGuard } from './token/token.guard';
import { multerConfig } from './multer.config';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  // POST /autenticacion/registro  — multipart/form-data
  @Post('/registro')
  @UseInterceptors(FileInterceptor('fotoPerfil', multerConfig))
  registrar(
    @Body() dto: UsuarioRegistroDTO,
    @UploadedFile() foto?: Express.Multer.File,
  ) {
    const urlFoto = foto
      ? `${process.env.APP_URL ?? 'http://localhost:3000'}/uploads/perfiles/${foto.filename}`
      : undefined;
    return this.autenticacionService.registrar(dto, urlFoto);
  }

  // POST /autenticacion/ingresar  — JSON
  @Post('/ingresar')
  ingresar(@Body() dto: UsuarioLoginDTO) {
    return this.autenticacionService.ingresar(dto);
  }

  // GET /autenticacion/seguro  — ruta protegida (igual que tenías)
/*   @Get('/seguro')
  @UseGuards(TokenGuard)
  rutaSegura(@Body('emailDelToken') email: any) {
    return { mensaje: 'Acceso otorgado a ' + email };
  } */

    // POST /autenticacion/autorizar
    @Post('/autorizar')
    @UseGuards(TokenGuard)
    autorizar(@Request() req: any) {
      return req.usuario;
    }

    // POST /autenticacion/refrescar
    @Post('/refrescar')
    @UseGuards(TokenGuard)
    refrescar(@Request() req: any) {
      const token = req.headers.authorization?.replace('Bearer ', '');
      return this.autenticacionService.refrescar(token);
    }
}