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
exports.AutenticacionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = __importStar(require("bcrypt"));
const usuarios_schema_1 = require("./usuarios.schema");
const jsonwebtoken_2 = require("jsonwebtoken");
let AutenticacionService = class AutenticacionService {
    usuarioModel;
    constructor(usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    async registrar(dto, fotoPerfil) {
        const emailExiste = await this.usuarioModel.findOne({ email: dto.email });
        if (emailExiste)
            throw new common_1.ConflictException('El email ya está registrado');
        const userExiste = await this.usuarioModel.findOne({ nombreUsuario: dto.nombreUsuario });
        if (userExiste)
            throw new common_1.ConflictException('El nombre de usuario ya está en uso');
        const hash = await bcrypt.hash(dto.contrasena, 10);
        const nuevo = await this.usuarioModel.create({
            ...dto,
            contrasena: hash,
            perfil: dto.perfil ?? 'usuario',
            fotoPerfil: fotoPerfil ?? undefined,
        });
        const payload = {
            email: nuevo.email,
            _id: nuevo._id,
            perfil: nuevo.perfil,
        };
        const jwt = (0, jsonwebtoken_1.sign)(payload, process.env.CLAVE_SUPERSECRETA, {
            algorithm: 'HS256',
            expiresIn: '15m',
        });
        const { contrasena: _, ...usuarioSinPassword } = nuevo.toObject();
        return { mensaje: 'Usuario registrado', token: jwt, usuario: usuarioSinPassword };
    }
    async ingresar(dto) {
        const usuario = await this.usuarioModel.findOne({
            $or: [{ email: dto.identifier }, { nombreUsuario: dto.identifier }],
        });
        if (!usuario)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const coincide = await bcrypt.compare(dto.contrasena, usuario.contrasena);
        if (!coincide)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        if (!usuario.activo)
            throw new common_1.UnauthorizedException('Tu cuenta está deshabilitada');
        const payload = {
            email: usuario.email,
            _id: usuario._id,
            perfil: usuario.perfil,
        };
        const jwt = (0, jsonwebtoken_1.sign)(payload, process.env.CLAVE_SUPERSECRETA, {
            algorithm: 'HS256',
            expiresIn: '15m',
        });
        const { contrasena: _, ...usuarioSinPassword } = usuario.toObject();
        return { token: jwt, usuario: usuarioSinPassword };
    }
    autorizar(token) {
        try {
            const payload = (0, jsonwebtoken_2.verify)(token, process.env.CLAVE_SUPERSECRETA);
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido o vencido');
        }
    }
    refrescar(token) {
        try {
            const payload = (0, jsonwebtoken_2.verify)(token, process.env.CLAVE_SUPERSECRETA);
            const nuevoToken = (0, jsonwebtoken_1.sign)({ email: payload.email, _id: payload._id, perfil: payload.perfil }, process.env.CLAVE_SUPERSECRETA, { algorithm: 'HS256', expiresIn: '15m' });
            return { token: nuevoToken };
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido o vencido');
        }
    }
};
exports.AutenticacionService = AutenticacionService;
exports.AutenticacionService = AutenticacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuarios_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AutenticacionService);
//# sourceMappingURL=autenticacion.service.js.map