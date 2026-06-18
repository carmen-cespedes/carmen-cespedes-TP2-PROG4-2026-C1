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
exports.PublicacionesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const publicaciones_schema_1 = require("./publicaciones.schema");
let PublicacionesService = class PublicacionesService {
    publicacionModel;
    constructor(publicacionModel) {
        this.publicacionModel = publicacionModel;
    }
    async crear(dto, usuarioId, imagenUrl) {
        const publicacion = await this.publicacionModel.create({
            ...dto,
            usuario: new mongoose_2.Types.ObjectId(usuarioId),
            imagen: imagenUrl,
        });
        return publicacion;
    }
    async listar(orden = 'fecha', usuarioId, offset = 0, limit = 10) {
        const filtro = { eliminado: false };
        if (usuarioId)
            filtro.usuario = new mongoose_2.Types.ObjectId(usuarioId);
        const ordenamiento = orden === 'meGusta'
            ? { 'meGusta': -1 }
            : { createdAt: -1 };
        return this.publicacionModel
            .find(filtro)
            .sort(ordenamiento)
            .skip(offset)
            .limit(limit)
            .populate('usuario', 'nombre apellido nombreUsuario fotoPerfil');
    }
    async eliminar(publicacionId, usuarioId, perfil) {
        const publicacion = await this.publicacionModel.findById(publicacionId);
        if (!publicacion)
            throw new common_1.NotFoundException('Publicación no encontrada');
        if (perfil !== 'administrador' && publicacion.usuario.toString() !== usuarioId) {
            throw new common_1.ForbiddenException('No tenés permiso para eliminar esta publicación');
        }
        publicacion.eliminado = true;
        await publicacion.save();
        return { mensaje: 'Publicación eliminada' };
    }
    async darMeGusta(publicacionId, usuarioId) {
        const publicacion = await this.publicacionModel.findById(publicacionId);
        if (!publicacion)
            throw new common_1.NotFoundException('Publicación no encontrada');
        const yaLeDioMeGusta = publicacion.meGusta.some(id => id.toString() === usuarioId);
        if (yaLeDioMeGusta)
            throw new common_1.ForbiddenException('Ya le diste me gusta a esta publicación');
        publicacion.meGusta.push(new mongoose_2.Types.ObjectId(usuarioId));
        await publicacion.save();
        return { mensaje: 'Me gusta agregado' };
    }
    async quitarMeGusta(publicacionId, usuarioId) {
        const publicacion = await this.publicacionModel.findById(publicacionId);
        if (!publicacion)
            throw new common_1.NotFoundException('Publicación no encontrada');
        const teniaMeGusta = publicacion.meGusta.some(id => id.toString() === usuarioId);
        if (!teniaMeGusta)
            throw new common_1.ForbiddenException('No le habías dado me gusta a esta publicación');
        publicacion.meGusta = publicacion.meGusta.filter(id => id.toString() !== usuarioId);
        await publicacion.save();
        return { mensaje: 'Me gusta eliminado' };
    }
};
exports.PublicacionesService = PublicacionesService;
exports.PublicacionesService = PublicacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publicaciones_schema_1.Publicacion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PublicacionesService);
//# sourceMappingURL=publicaciones.service.js.map