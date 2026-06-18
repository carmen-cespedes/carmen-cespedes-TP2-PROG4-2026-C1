import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comentario } from './comentarios.schema';
import { CrearComentarioDTO, EditarComentarioDTO } from './comentarios.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name) private comentarioModel: Model<Comentario>,
  ) {}

  async crear(publicacionId: string, usuarioId: string, dto: CrearComentarioDTO) {
    return this.comentarioModel.create({
      publicacion: new Types.ObjectId(publicacionId),
      usuario: new Types.ObjectId(usuarioId),
      mensaje: dto.mensaje,
    });
  }

  async editar(comentarioId: string, usuarioId: string, dto: EditarComentarioDTO) {
    const comentario = await this.comentarioModel.findById(comentarioId);
    if (!comentario) throw new NotFoundException('Comentario no encontrado');
    if (comentario.usuario.toString() !== usuarioId) {
      throw new ForbiddenException('No podés editar este comentario');
    }
    comentario.mensaje = dto.mensaje;
    comentario.modificado = true;
    await comentario.save();
    return comentario;
  }

  async listar(publicacionId: string, offset: number = 0, limit: number = 5) {
    return this.comentarioModel
      .find({ publicacion: new Types.ObjectId(publicacionId) })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('usuario', 'nombre apellido nombreUsuario fotoPerfil');
  }
}