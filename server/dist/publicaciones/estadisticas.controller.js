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
exports.EstadisticasController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const publicaciones_schema_1 = require("./publicaciones.schema");
const comentarios_schema_1 = require("../comentarios/comentarios.schema");
const token_guard_1 = require("../autenticacion/token/token.guard");
const admin_guard_1 = require("../autenticacion/admin.guard");
let EstadisticasController = class EstadisticasController {
    publicacionModel;
    comentarioModel;
    constructor(publicacionModel, comentarioModel) {
        this.publicacionModel = publicacionModel;
        this.comentarioModel = comentarioModel;
    }
    async publicacionesPorUsuario(desde, hasta) {
        const filtro = { eliminado: false };
        if (desde || hasta) {
            filtro.createdAt = {};
            if (desde)
                filtro.createdAt.$gte = new Date(desde);
            if (hasta)
                filtro.createdAt.$lte = new Date(hasta);
        }
        return this.publicacionModel.aggregate([
            { $match: filtro },
            { $group: { _id: '$usuario', total: { $sum: 1 } } },
            { $lookup: { from: 'usuarios', localField: '_id', foreignField: '_id', as: 'usuario' } },
            { $unwind: '$usuario' },
            { $project: { nombre: '$usuario.nombre', nombreUsuario: '$usuario.nombreUsuario', total: 1 } },
        ]);
    }
    async comentarios(desde, hasta) {
        const filtro = {};
        if (desde || hasta) {
            filtro.createdAt = {};
            if (desde)
                filtro.createdAt.$gte = new Date(desde);
            if (hasta)
                filtro.createdAt.$lte = new Date(hasta);
        }
        return this.comentarioModel.countDocuments(filtro);
    }
    async comentariosPorPublicacion(desde, hasta) {
        const filtro = {};
        if (desde || hasta) {
            filtro.createdAt = {};
            if (desde)
                filtro.createdAt.$gte = new Date(desde);
            if (hasta)
                filtro.createdAt.$lte = new Date(hasta);
        }
        return this.comentarioModel.aggregate([
            { $match: filtro },
            { $group: { _id: '$publicacion', total: { $sum: 1 } } },
            { $lookup: { from: 'publicacions', localField: '_id', foreignField: '_id', as: 'publicacion' } },
            { $unwind: '$publicacion' },
            { $project: { titulo: '$publicacion.titulo', total: 1 } },
        ]);
    }
};
exports.EstadisticasController = EstadisticasController;
__decorate([
    (0, common_1.Get)('publicaciones-por-usuario'),
    __param(0, (0, common_1.Query)('desde')),
    __param(1, (0, common_1.Query)('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EstadisticasController.prototype, "publicacionesPorUsuario", null);
__decorate([
    (0, common_1.Get)('comentarios'),
    __param(0, (0, common_1.Query)('desde')),
    __param(1, (0, common_1.Query)('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EstadisticasController.prototype, "comentarios", null);
__decorate([
    (0, common_1.Get)('comentarios-por-publicacion'),
    __param(0, (0, common_1.Query)('desde')),
    __param(1, (0, common_1.Query)('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EstadisticasController.prototype, "comentariosPorPublicacion", null);
exports.EstadisticasController = EstadisticasController = __decorate([
    (0, common_1.Controller)('estadisticas'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard, admin_guard_1.AdminGuard),
    __param(0, (0, mongoose_1.InjectModel)(publicaciones_schema_1.Publicacion.name)),
    __param(1, (0, mongoose_1.InjectModel)(comentarios_schema_1.Comentario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EstadisticasController);
//# sourceMappingURL=estadisticas.controller.js.map