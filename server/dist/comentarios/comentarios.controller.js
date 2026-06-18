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
exports.ComentariosController = void 0;
const common_1 = require("@nestjs/common");
const comentarios_service_1 = require("./comentarios.service");
const comentarios_dto_1 = require("./comentarios.dto");
const token_guard_1 = require("../autenticacion/token/token.guard");
let ComentariosController = class ComentariosController {
    comentariosService;
    constructor(comentariosService) {
        this.comentariosService = comentariosService;
    }
    crear(publicacionId, dto, req) {
        return this.comentariosService.crear(publicacionId, req.usuario._id, dto);
    }
    editar(id, dto, req) {
        return this.comentariosService.editar(id, req.usuario._id, dto);
    }
    listar(publicacionId, offset, limit) {
        return this.comentariosService.listar(publicacionId, offset ? parseInt(offset) : 0, limit ? parseInt(limit) : 5);
    }
};
exports.ComentariosController = ComentariosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Param)('publicacionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comentarios_dto_1.CrearComentarioDTO, Object]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "crear", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comentarios_dto_1.EditarComentarioDTO, Object]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "editar", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Param)('publicacionId')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "listar", null);
exports.ComentariosController = ComentariosController = __decorate([
    (0, common_1.Controller)('publicaciones/:publicacionId/comentarios'),
    __metadata("design:paramtypes", [comentarios_service_1.ComentariosService])
], ComentariosController);
//# sourceMappingURL=comentarios.controller.js.map