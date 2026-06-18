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
exports.ComentarioSchema = exports.Comentario = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Comentario = class Comentario {
    publicacion;
    usuario;
    mensaje;
    modificado;
};
exports.Comentario = Comentario;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Publicacion', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Comentario.prototype, "publicacion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Usuario', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Comentario.prototype, "usuario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Comentario.prototype, "mensaje", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Comentario.prototype, "modificado", void 0);
exports.Comentario = Comentario = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Comentario);
exports.ComentarioSchema = mongoose_1.SchemaFactory.createForClass(Comentario);
//# sourceMappingURL=comentarios.schema.js.map