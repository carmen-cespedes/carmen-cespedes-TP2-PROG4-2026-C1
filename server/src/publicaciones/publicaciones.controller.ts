import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicacionesService } from './publicaciones.service';
import { CrearPublicacionDTO } from './publicaciones.dto';
import { TokenGuard } from '../autenticacion/token/token.guard';
import { multerConfig } from '../autenticacion/multer.config';
import { multerPublicacionesConfig } from '../autenticacion/multer-publicaciones.config';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Post()
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('imagen', multerPublicacionesConfig))
  crear(
    @Body() dto: CrearPublicacionDTO,
    @Request() req: any,
    @UploadedFile() imagen?: Express.Multer.File,
  ) {
      const imagenUrl = imagen ? (imagen as any).path : undefined;
      
    return this.publicacionesService.crear(dto, req.usuario._id, imagenUrl);
  }

  @Get()
  @UseGuards(TokenGuard)
  listar(
    @Query('orden') orden: string,
    @Query('usuarioId') usuarioId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    return this.publicacionesService.listar(
      orden,
      usuarioId,
      offset ? parseInt(offset) : 0,
      limit ? parseInt(limit) : 10,
    );
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  eliminar(@Param('id') id: string, @Request() req: any) {
    return this.publicacionesService.eliminar(id, req.usuario._id, req.usuario.perfil);
  }

  @Post(':id/me-gusta')
  @UseGuards(TokenGuard)
  darMeGusta(@Param('id') id: string, @Request() req: any) {
    return this.publicacionesService.darMeGusta(id, req.usuario._id);
  }

  @Delete(':id/me-gusta')
  @UseGuards(TokenGuard)
  quitarMeGusta(@Param('id') id: string, @Request() req: any) {
    return this.publicacionesService.quitarMeGusta(id, req.usuario._id);
  }
}