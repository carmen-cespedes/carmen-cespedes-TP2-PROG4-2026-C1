"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const usuarios_schema_1 = require("../autenticacion/usuarios.schema");
let UsuariosService = class UsuariosService {
    usuarioModel;
    constructor(usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    async listar() {
        return this.usuarioModel.find().select('-contrasena');
    }
    async crear(datos) {
        const emailExiste = await this.usuarioModel.findOne({ email: datos.email });
        if (emailExiste)
            throw new common_1.ConflictException('El email ya está registrado');
        const userExiste = await this.usuarioModel.findOne({ nombreUsuario: datos.nombreUsuario });
        if (userExiste)
            throw new common_1.ConflictException('El nombre de usuario ya está en uso');
        const hash = await bcrypt.hash(datos.contrasena, 10);
        const nuevo = await this.usuarioModel.create({
            ...datos,
            contrasena: hash,
            perfil: datos.perfil ?? 'usuario',
        });
        const { contrasena: _, ...usuarioSinPassword } = nuevo.toObject();
        return usuarioSinPassword;
    }
    async deshabilitar(id) {
        const usuario = await this.usuarioModel.findById(id);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        usuario.activo = false;
        await usuario.save();
        return { mensaje: 'Usuario deshabilitado' };
    }
    async habilitar(id) {
        const usuario = await this.usuarioModel.findById(id);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        usuario.activo = true;
        await usuario.save();
        return { mensaje: 'Usuario habilitado' };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuarios_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map