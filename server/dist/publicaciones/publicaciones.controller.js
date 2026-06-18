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
exports.PublicacionesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const publicaciones_service_1 = require("./publicaciones.service");
const publicaciones_dto_1 = require("./publicaciones.dto");
const token_guard_1 = require("../autenticacion/token/token.guard");
const multer_publicaciones_config_1 = require("../autenticacion/multer-publicaciones.config");
let PublicacionesController = class PublicacionesController {
    publicacionesService;
    constructor(publicacionesService) {
        this.publicacionesService = publicacionesService;
    }
    crear(dto, req, imagen) {
        const imagenUrl = imagen
            ? `${process.env.APP_URL}/uploads/publicaciones/${imagen.filename}`
            : undefined;
        return this.publicacionesService.crear(dto, req.usuario._id, imagenUrl);
    }
    listar(orden, usuarioId, offset, limit) {
        return this.publicacionesService.listar(orden, usuarioId, offset ? parseInt(offset) : 0, limit ? parseInt(limit) : 10);
    }
    eliminar(id, req) {
        return this.publicacionesService.eliminar(id, req.usuario._id, req.usuario.perfil);
    }
    darMeGusta(id, req) {
        return this.publicacionesService.darMeGusta(id, req.usuario._id);
    }
    quitarMeGusta(id, req) {
        return this.publicacionesService.quitarMeGusta(id, req.usuario._id);
    }
};
exports.PublicacionesController = PublicacionesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', multer_publicaciones_config_1.multerPublicacionesConfig)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publicaciones_dto_1.CrearPublicacionDTO, Object, Object]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Query)('orden')),
    __param(1, (0, common_1.Query)('usuarioId')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "listar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "eliminar", null);
__decorate([
    (0, common_1.Post)(':id/me-gusta'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "darMeGusta", null);
__decorate([
    (0, common_1.Delete)(':id/me-gusta'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "quitarMeGusta", null);
exports.PublicacionesController = PublicacionesController = __decorate([
    (0, common_1.Controller)('publicaciones'),
    __metadata("design:paramtypes", [publicaciones_service_1.PublicacionesService])
], PublicacionesController);
//# sourceMappingURL=publicaciones.controller.js.map