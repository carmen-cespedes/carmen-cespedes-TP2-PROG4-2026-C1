import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { TokenGuard } from './token/token.guard';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usuario = request.usuario;

    if (!usuario) throw new ForbiddenException('No autenticado');
    if (usuario.perfil !== 'administrador') throw new ForbiddenException('Acceso solo para administradores');

    return true;
  }
}