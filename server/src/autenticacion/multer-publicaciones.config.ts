import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const multerPublicacionesConfig = {
  storage: diskStorage({
    destination: './uploads/publicaciones',
    filename: (_req, file, cb) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    const permitidos = /jpeg|jpg|png|webp/;
    const valido =
      permitidos.test(extname(file.originalname).toLowerCase()) &&
      permitidos.test(file.mimetype);
    valido
      ? cb(null, true)
      : cb(new BadRequestException('Solo se permiten jpg, png o webp'), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
};