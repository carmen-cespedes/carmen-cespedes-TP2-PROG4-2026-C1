import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../usuarios.schema';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req: Request = http.getRequest();
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '') || '';
    
    try {
      const verificado = verify(token, process.env.CLAVE_SUPERSECRETA!);
      const payload = verificado as { email: string; _id: string; perfil: string };

      const usuario = await this.usuarioModel.findById(payload._id);
      if (!usuario || !usuario.activo) {
        throw new UnauthorizedException('Tu cuenta está deshabilitada');
      }

      if (!req.body) {
        req.body = { emailDelToken: payload.email };
      } else {
        req.body.emailDelToken = payload.email;
      }

      (req as any).usuario = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}