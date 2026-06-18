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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchema = exports.Usuario = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Usuario = class Usuario {
    email;
    contrasena;
    nombre;
    apellido;
    fechaNacimiento;
    descripcion;
    nombreUsuario;
    fotoPerfil;
    telefono;
    perfil;
    activo;
};
exports.Usuario = Usuario;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasena", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Usuario.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Usuario.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nombreUsuario", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Usuario.prototype, "fotoPerfil", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'usuario', enum: ['usuario', 'administrador'] }),
    __metadata("design:type", String)
], Usuario.prototype, "perfil", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "activo", void 0);
exports.Usuario = Usuario = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Usuario);
exports.UsuarioSchema = mongoose_1.SchemaFactory.createForClass(Usuario);
//# sourceMappingURL=usuarios.schema.js.map