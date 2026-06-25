import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const req: Request = http.getRequest();
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '') || '';
    try {
      const verificado = verify(token, process.env.CLAVE_SUPERSECRETA!);
      const payload = verificado as { email: string; _id: string; perfil: string };

      if (!req.body) {
        req.body = { emailDelToken: payload.email };
      } else {
        req.body.emailDelToken = payload.email;
      }

      (req as any).usuario = payload;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}