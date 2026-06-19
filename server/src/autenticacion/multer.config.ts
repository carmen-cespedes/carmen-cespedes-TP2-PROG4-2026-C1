import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { cloudinary } from '../cloudinary.config';
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'perfiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

export const multerConfig = {
  storage,
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
