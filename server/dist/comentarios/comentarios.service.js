"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comentarios_schema_1 = require("./comentarios.schema");
let ComentariosService = class ComentariosService {
    comentarioModel;
    constructor(comentarioModel) {
        this.comentarioModel = comentarioModel;
    }
    async crear(publicacionId, usuarioId, dto) {
        return this.comentarioModel.create({
            publicacion: new mongoose_2.Types.ObjectId(publicacionId),
            usuario: new mongoose_2.Types.ObjectId(usuarioId),
            mensaje: dto.mensaje,
        });
    }
    async editar(comentarioId, usuarioId, dto) {
        const comentario = await this.comentarioModel.findById(comentarioId);
        if (!comentario)
            throw new common_1.NotFoundException('Comentario no encontrado');
        if (comentario.usuario.toString() !== usuarioId) {
            throw new common_1.ForbiddenException('No podés editar este comentario');
        }
        comentario.mensaje = dto.mensaje;
        comentario.modificado = true;
        await comentario.save();
        return comentario;
    }
    async listar(publicacionId, offset = 0, limit = 5) {
        return this.comentarioModel
            .find({ publicacion: new mongoose_2.Types.ObjectId(publicacionId) })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .populate('usuario', 'nombre apellido nombreUsuario fotoPerfil');
    }
};
exports.ComentariosService = ComentariosService;
exports.ComentariosService = ComentariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comentarios_schema_1.Comentario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ComentariosService);
//# sourceMappingURL=comentarios.service.js.map