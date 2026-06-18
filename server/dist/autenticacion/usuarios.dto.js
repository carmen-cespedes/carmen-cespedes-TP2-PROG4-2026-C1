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
exports.UsuarioLoginDTO = exports.UsuarioRegistroDTO = void 0;
const class_validator_1 = require("class-validator");
class UsuarioRegistroDTO {
    nombre;
    apellido;
    fechaNacimiento;
    descripcion;
    email;
    nombreUsuario;
    contrasena;
    perfil;
}
exports.UsuarioRegistroDTO = UsuarioRegistroDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "nombreUsuario", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'La contrasena debe tener al menos 8 caracteres' }),
    (0, class_validator_1.Matches)(/[A-Z]/, { message: 'Debe tener al menos una mayúscula' }),
    (0, class_validator_1.Matches)(/[0-9]/, { message: 'Debe tener al menos un número' }),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "contrasena", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['usuario', 'administrador']),
    __metadata("design:type", String)
], UsuarioRegistroDTO.prototype, "perfil", void 0);
class UsuarioLoginDTO {
    identifier;
    contrasena;
}
exports.UsuarioLoginDTO = UsuarioLoginDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioLoginDTO.prototype, "identifier", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioLoginDTO.prototype, "contrasena", void 0);
//# sourceMappingURL=usuarios.dto.js.map