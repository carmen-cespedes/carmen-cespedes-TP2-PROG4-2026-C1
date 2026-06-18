import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion } from './publicaciones.schema';
import { Comentario } from '../comentarios/comentarios.schema';
import { TokenGuard } from '../autenticacion/token/token.guard';
import { AdminGuard } from '../autenticacion/admin.guard';

@Controller('estadisticas')
@UseGuards(TokenGuard, AdminGuard)
export class EstadisticasController {
  constructor(
    @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
    @InjectModel(Comentario.name) private comentarioModel: Model<Comentario>,
  ) {}

  // GET /estadisticas/publicaciones-por-usuario
  @Get('publicaciones-por-usuario')
  async publicacionesPorUsuario(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ) {
    const filtro: any = { eliminado: false };
    if (desde || hasta) {
      filtro.createdAt = {};
      if (desde) filtro.createdAt.$gte = new Date(desde);
      if (hasta) filtro.createdAt.$lte = new Date(hasta);
    }

    return this.publicacionModel.aggregate([
      { $match: filtro },
      { $group: { _id: '$usuario', total: { $sum: 1 } } },
      { $lookup: { from: 'usuarios', localField: '_id', foreignField: '_id', as: 'usuario' } },
      { $unwind: '$usuario' },
      { $project: { nombre: '$usuario.nombre', nombreUsuario: '$usuario.nombreUsuario', total: 1 } },
    ]);
  }

  // GET /estadisticas/comentarios
  @Get('comentarios')
  async comentarios(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ) {
    const filtro: any = {};
    if (desde || hasta) {
      filtro.createdAt = {};
      if (desde) filtro.createdAt.$gte = new Date(desde);
      if (hasta) filtro.createdAt.$lte = new Date(hasta);
    }
    return this.comentarioModel.countDocuments(filtro);
  }

  // GET /estadisticas/comentarios-por-publicacion
  @Get('comentarios-por-publicacion')
  async comentariosPorPublicacion(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ) {
    const filtro: any = {};
    if (desde || hasta) {
      filtro.createdAt = {};
      if (desde) filtro.createdAt.$gte = new Date(desde);
      if (hasta) filtro.createdAt.$lte = new Date(hasta);
    }

    return this.comentarioModel.aggregate([
      { $match: filtro },
      { $group: { _id: '$publicacion', total: { $sum: 1 } } },
      { $lookup: { from: 'publicacions', localField: '_id', foreignField: '_id', as: 'publicacion' } },
      { $unwind: '$publicacion' },
      { $project: { titulo: '$publicacion.titulo', total: 1 } },
    ]);
  }
}