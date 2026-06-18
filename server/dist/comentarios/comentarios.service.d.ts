import { Model, Types } from 'mongoose';
import { Comentario } from './comentarios.schema';
import { CrearComentarioDTO, EditarComentarioDTO } from './comentarios.dto';
export declare class ComentariosService {
    private comentarioModel;
    constructor(comentarioModel: Model<Comentario>);
    crear(publicacionId: string, usuarioId: string, dto: CrearComentarioDTO): Promise<import("mongoose").Document<unknown, {}, Comentario, {}, import("mongoose").DefaultSchemaOptions> & Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    editar(comentarioId: string, usuarioId: string, dto: EditarComentarioDTO): Promise<import("mongoose").Document<unknown, {}, Comentario, {}, import("mongoose").DefaultSchemaOptions> & Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    listar(publicacionId: string, offset?: number, limit?: number): Promise<(import("mongoose").Document<unknown, {}, Comentario, {}, import("mongoose").DefaultSchemaOptions> & Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
