import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AutenticacionService } from './autenticacion.service';
import { UsuarioRegistroDTO, UsuarioLoginDTO } from './usuarios.dto';
import { TokenGuard } from './token/token.guard';
import { multerConfig } from './multer.config';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('/registro')
  @UseInterceptors(FileInterceptor('fotoPerfil', multerConfig))
  registrar(
    @Body() dto: UsuarioRegistroDTO,
    @UploadedFile() foto?: Express.Multer.File,
  ) {
    const urlFoto = foto ? (foto as any).path : undefined;
    return this.autenticacionService.registrar(dto, urlFoto);
  }

  @Post('/ingresar')
  ingresar(@Body() dto: UsuarioLoginDTO) {
    return this.autenticacionService.ingresar(dto);
  }

  @Post('/autorizar')
  @UseGuards(TokenGuard)
  autorizar(@Request() req: any) {
    return req.usuario;
  }

  @Post('/refrescar')
  @UseGuards(TokenGuard)
  refrescar(@Request() req: any) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    return this.autenticacionService.refrescar(token);
  }
}