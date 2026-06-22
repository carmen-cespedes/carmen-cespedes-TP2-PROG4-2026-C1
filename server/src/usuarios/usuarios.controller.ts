import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { TokenGuard } from '../autenticacion/token/token.guard';
import { AdminGuard } from '../autenticacion/admin.guard';
import { multerConfig } from '../autenticacion/multer.config';

@Controller('usuarios')
@UseGuards(TokenGuard, AdminGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // GET /usuarios
  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  // POST /usuarios
  @Post()
  crear(@Body() datos: any) {
    return this.usuariosService.crear(datos);
  }

  // DELETE /usuarios/:id
  @Delete(':id')
  deshabilitar(@Param('id') id: string) {
    return this.usuariosService.deshabilitar(id);
  }

  // POST /usuarios/:id/habilitar
  @Post(':id/habilitar')
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