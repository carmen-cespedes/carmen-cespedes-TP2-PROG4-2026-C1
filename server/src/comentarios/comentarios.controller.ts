import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CrearComentarioDTO, EditarComentarioDTO } from './comentarios.dto';
import { TokenGuard } from '../autenticacion/token/token.guard';

@Controller('publicaciones/:publicacionId/comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  // POST /publicaciones/:publicacionId/comentarios
  @Post()
  @UseGuards(TokenGuard)
  crear(
    @Param('publicacionId') publicacionId: string,
    @Body() dto: CrearComentarioDTO,
    @Request() req: any,
  ) {
    return this.comentariosService.crear(publicacionId, req.usuario._id, dto);
  }

  // PUT /publicaciones/:publicacionId/comentarios/:id
  @Put(':id')
  @UseGuards(TokenGuard)
  editar(
    @Param('id') id: string,
    @Body() dto: EditarComentarioDTO,
    @Request() req: any,
  ) {
    return this.comentariosService.editar(id, req.usuario._id, dto);
  }

  // GET /publicaciones/:publicacionId/comentarios
  @Get()
  @UseGuards(TokenGuard)
  listar(
    @Param('publicacionId') publicacionId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    return this.comentariosService.listar(
      publicacionId,
      offset ? parseInt(offset) : 0,
      limit ? parseInt(limit) : 5,
    );
  }
}