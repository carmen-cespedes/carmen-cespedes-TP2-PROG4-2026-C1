"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/perfiles',
        filename: (_req, file, cb) => {
            cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    fileFilter: (_req, file, cb) => {
        const permitidos = /jpeg|jpg|png|webp/;
        const valido = permitidos.test((0, path_1.extname)(file.originalname).toLowerCase()) &&
            permitidos.test(file.mimetype);
        valido
            ? cb(null, true)
            : cb(new common_1.BadRequestException('Solo se permiten jpg, png o webp'), false);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
};
//# sourceMappingURL=multer.config.js.map