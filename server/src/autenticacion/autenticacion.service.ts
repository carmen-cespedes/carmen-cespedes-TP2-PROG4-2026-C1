import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuarios.schema';
import { UsuarioRegistroDTO, UsuarioLoginDTO } from './usuarios.dto';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AutenticacionService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  /* async registrar(dto: UsuarioRegistroDTO, fotoPerfil?: string) {
    // Verificar email duplicado
    const emailExiste = await this.usuarioModel.findOne({ email: dto.email });
    if (emailExiste) throw new ConflictException('El email ya está registrado');

    // Verificar username duplicado
    const userExiste = await this.usuarioModel.findOne({ nombreUsuario: dto.nombreUsuario });
    if (userExiste) throw new ConflictException('El nombre de usuario ya está en uso');

    // Encriptar contrasena
    const hash = await bcrypt.hash(dto.contrasena, 10);

    // Crear usuario
    const nuevo = await this.usuarioModel.create({
      ...dto,
      contrasena: hash,
      perfil: dto.perfil ?? 'usuario',
      fotoPerfil: fotoPerfil ?? undefined,
    }) as any; */

    async registrar(dto: UsuarioRegistroDTO, fotoPerfil?: string) {
      const emailExiste = await this.usuarioModel.findOne({ email: dto.email });
      if (emailExiste) throw new ConflictException('El email ya está registrado');

      const userExiste = await this.usuarioModel.findOne({ nombreUsuario: dto.nombreUsuario });
      if (userExiste) throw new ConflictException('El nombre de usuario ya está en uso');

      const hash = await bcrypt.hash(dto.contrasena, 10);

      const nuevo = await this.usuarioModel.create({
        ...dto,
        contrasena: hash,
        perfil: dto.perfil ?? 'usuario',
        fotoPerfil: fotoPerfil ?? undefined,
      }) as any;

      const payload = {
        email: nuevo.email,
        _id: nuevo._id,
        perfil: nuevo.perfil,
      };
      const jwt = sign(payload, process.env.CLAVE_SUPERSECRETA!, {
        algorithm: 'HS256',
        expiresIn: '15m',
      });

      // ← agregá el usuario en la respuesta igual que en ingresar()
      const { contrasena: _, ...usuarioSinPassword } = nuevo.toObject();
      return { mensaje: 'Usuario registrado', token: jwt, usuario: usuarioSinPassword };
    }

/* 
    const payload = {
      email: nuevo.email,
      _id: nuevo._id,
      perfil: nuevo.perfil,
    };
    const jwt = sign(payload, process.env.CLAVE_SUPERSECRETA!, {
      algorithm: 'HS256',
      expiresIn: '15m',
    });

    return { mensaje: 'Usuario registrado', token: jwt };
  }
 */
  async ingresar(dto: UsuarioLoginDTO) {

    const usuario = await this.usuarioModel.findOne({
      $or: [{ email: dto.identifier }, { nombreUsuario: dto.identifier }],
    });

    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');


    const coincide = await bcrypt.compare(dto.contrasena, usuario.contrasena);
    if (!coincide) throw new UnauthorizedException('Credenciales inválidas');

    if (!usuario.activo) throw new UnauthorizedException('cuenta-deshabilitada');
    
    // Generar JWT
    const payload = {
      email: usuario.email,
      _id: usuario._id,
      perfil: usuario.perfil,
    };
    const jwt = sign(payload, process.env.CLAVE_SUPERSECRETA!, {
      algorithm: 'HS256',
      expiresIn: '15m',
    });

    // Devolver todos los datos del usuario (sin la contrasena)
    const { contrasena: _, ...usuarioSinPassword } = usuario.toObject();
    return { token: jwt, usuario: usuarioSinPassword };
  }

  autorizar(token: string) {
    try {
      const payload = verify(token, process.env.CLAVE_SUPERSECRETA!);
      return payload;
    } catch {
      throw new UnauthorizedException('Token inválido o vencido');
    }
  }

  refrescar(token: string) {
    try {
      const payload = verify(token, process.env.CLAVE_SUPERSECRETA!) as any;
      const nuevoToken = sign(
        { email: payload.email, _id: payload._id, perfil: payload.perfil },
        process.env.CLAVE_SUPERSECRETA!,
        { algorithm: 'HS256', expiresIn: '15m' }
      );
      return { token: nuevoToken };
    } catch {
      throw new UnauthorizedException('Token inválido o vencido');
    }
  }
  
}