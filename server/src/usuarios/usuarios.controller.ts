import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { TokenGuard } from '../autenticacion/token/token.guard';
import { AdminGuard } from '../autenticacion/admin.guard';
import { multerConfig } from '../autenticacion/multer.config';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @UseGuards(TokenGuard, AdminGuard)
  listar() {
    return this.usuariosService.listar();
  }

  @Post()
  @UseGuards(TokenGuard, AdminGuard)
  crear(@Body() datos: any) {
    return this.usuariosService.crear(datos);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, AdminGuard)
  deshabilitar(@Param('id') id: string) {
    return this.usuariosService.deshabilitar(id);
  }

  @Post(':id/habilitar')
  @UseGuards(TokenGuard, AdminGuard)
  habilitar(@Param('id') id: string) {
    return this.usuariosService.habilitar(id);
  }

  @Post('foto-perfil')
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('fotoPerfil', multerConfig))
  actualizarFoto(
    @Request() req: any,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    const urlFoto = (foto as any).path;
    return this.usuariosService.actualizarFoto(req.usuario._id, urlFoto);
  }
}