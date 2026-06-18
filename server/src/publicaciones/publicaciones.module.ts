import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';
import { Publicacion, PublicacionSchema } from './publicaciones.schema';
import { EstadisticasController } from './estadisticas.controller';
import { Comentario, ComentarioSchema } from '../comentarios/comentarios.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Publicacion.name, schema: PublicacionSchema },
      { name: Comentario.name, schema: ComentarioSchema },
    ]),
  ],
  controllers: [PublicacionesController, EstadisticasController],
  providers: [PublicacionesService],
})
export class PublicacionesModule {}