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
exports.AutenticacionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const autenticacion_service_1 = require("./autenticacion.service");
const usuarios_dto_1 = require("./usuarios.dto");
const token_guard_1 = require("./token/token.guard");
const multer_config_1 = require("./multer.config");
let AutenticacionController = class AutenticacionController {
    autenticacionService;
    constructor(autenticacionService) {
        this.autenticacionService = autenticacionService;
    }
    registrar(dto, foto) {
        const urlFoto = foto
            ? `${process.env.APP_URL ?? 'http://localhost:3000'}/uploads/perfiles/${foto.filename}`
            : undefined;
        return this.autenticacionService.registrar(dto, urlFoto);
    }
    ingresar(dto) {
        return this.autenticacionService.ingresar(dto);
    }
    autorizar(req) {
        return req.usuario;
    }
    refrescar(req) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        return this.autenticacionService.refrescar(token);
    }
};
exports.AutenticacionController = AutenticacionController;
__decorate([
    (0, common_1.Post)('/registro'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('fotoPerfil', multer_config_1.multerConfig)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuarios_dto_1.UsuarioRegistroDTO, Object]),
    __metadata("design:returntype", void 0)
], AutenticacionController.prototype, "registrar", null);
__decorate([
    (0, common_1.Post)('/ingresar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuarios_dto_1.UsuarioLoginDTO]),
    __metadata("design:returntype", void 0)
], AutenticacionController.prototype, "ingresar", null);
__decorate([
    (0, common_1.Post)('/autorizar'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutenticacionController.prototype, "autorizar", null);
__decorate([
    (0, common_1.Post)('/refrescar'),
    (0, common_1.UseGuards)(token_guard_1.TokenGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutenticacionController.prototype, "refrescar", null);
exports.AutenticacionController = AutenticacionController = __decorate([
    (0, common_1.Controller)('autenticacion'),
    __metadata("design:paramtypes", [autenticacion_service_1.AutenticacionService])
], AutenticacionController);
//# sourceMappingURL=autenticacion.controller.js.map