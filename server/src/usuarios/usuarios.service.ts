import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Usuario } from '../autenticacion/usuarios.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async listar() {
    return this.usuarioModel.find().select('-contrasena');
  }

  async crear(datos: any) {
    const emailExiste = await this.usuarioModel.findOne({ email: datos.email });
    if (emailExiste) throw new ConflictException('El email ya está registrado');

    const userExiste = await this.usuarioModel.findOne({ nombreUsuario: datos.nombreUsuario });
    if (userExiste) throw new ConflictException('El nombre de usuario ya está en uso');

    const hash = await bcrypt.hash(datos.contrasena, 10);
    const nuevo = await this.usuarioModel.create({
      ...datos,
      contrasena: hash,
      perfil: datos.perfil ?? 'usuario',
    }) as any;

    const { contrasena: _, ...usuarioSinPassword } = nuevo.toObject();
    return usuarioSinPassword;
  }

  async deshabilitar(id: string) {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    usuario.activo = false;
    await usuario.save();
    return { mensaje: 'Usuario deshabilitado' };
  }

  async habilitar(id: string) {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    usuario.activo = true;
    await usuario.save();
    return { mensaje: 'Usuario habilitado' };
  }

  async actualizarFoto(usuarioId: string, urlFoto: string) {
    const usuario = await this.usuarioModel.findByIdAndUpdate(
      usuarioId,
      { fotoPerfil: urlFoto },
      { new: true }
    );
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    const { contrasena: _, ...usuarioSinPassword } = (usuario as any).toObject();
    return usuarioSinPassword;
  }
}