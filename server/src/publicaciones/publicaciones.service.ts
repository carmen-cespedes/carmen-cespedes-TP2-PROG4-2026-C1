import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Publicacion } from './publicaciones.schema';
import { CrearPublicacionDTO } from './publicaciones.dto';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
  ) {}

  async crear(dto: CrearPublicacionDTO, usuarioId: string, imagenUrl?: string) {
    const publicacion = await this.publicacionModel.create({
      ...dto,
      usuario: new Types.ObjectId(usuarioId),
      imagen: imagenUrl,
    });
    return publicacion;
  }

  async listar(orden: string = 'fecha', usuarioId?: string, offset: number = 0, limit: number = 10) {
    const filtro: any = { eliminado: false };
    if (usuarioId) filtro.usuario = new Types.ObjectId(usuarioId);

    const ordenamiento: any = orden === 'meGusta'
      ? { 'meGusta': -1 }
      : { createdAt: -1 };

    return this.publicacionModel
      .find(filtro)
      .sort(ordenamiento)
      .skip(offset)
      .limit(limit)
      .populate('usuario', 'nombre apellido nombreUsuario fotoPerfil');
  }

  async eliminar(publicacionId: string, usuarioId: string, perfil: string) {
    const publicacion = await this.publicacionModel.findById(publicacionId);
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    if (perfil !== 'administrador' && publicacion.usuario.toString() !== usuarioId) {
      throw new ForbiddenException('No tenés permiso para eliminar esta publicación');
    }

    publicacion.eliminado = true;
    await publicacion.save();
    return { mensaje: 'Publicación eliminada' };
  }

  async darMeGusta(publicacionId: string, usuarioId: string) {
    const publicacion = await this.publicacionModel.findById(publicacionId);
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    const yaLeDioMeGusta = publicacion.meGusta.some(
      id => id.toString() === usuarioId
    );
    if (yaLeDioMeGusta) throw new ForbiddenException('Ya le diste me gusta a esta publicación');

    publicacion.meGusta.push(new Types.ObjectId(usuarioId));
    await publicacion.save();
    return { mensaje: 'Me gusta agregado' };
  }

  async quitarMeGusta(publicacionId: string, usuarioId: string) {
    const publicacion = await this.publicacionModel.findById(publicacionId);
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    const teniaMeGusta = publicacion.meGusta.some(
      id => id.toString() === usuarioId
    );
    if (!teniaMeGusta) throw new ForbiddenException('No le habías dado me gusta a esta publicación');

    publicacion.meGusta = publicacion.meGusta.filter(
      id => id.toString() !== usuarioId
    ) as Types.ObjectId[];
    await publicacion.save();
    return { mensaje: 'Me gusta eliminado' };
  }
}