"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const autenticacion_service_1 = require("./autenticacion.service");
const autenticacion_controller_1 = require("./autenticacion.controller");
const usuarios_schema_1 = require("./usuarios.schema");
let AutenticacionModule = class AutenticacionModule {
};
exports.AutenticacionModule = AutenticacionModule;
exports.AutenticacionModule = AutenticacionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: usuarios_schema_1.Usuario.name, schema: usuarios_schema_1.UsuarioSchema }]),
            platform_express_1.MulterModule.register({ dest: './uploads/perfiles' }),
        ],
        controllers: [autenticacion_controller_1.AutenticacionController],
        providers: [autenticacion_service_1.AutenticacionService],
    })
], AutenticacionModule);
//# sourceMappingURL=autenticacion.module.js.map