import { Model, Types } from 'mongoose';
import { Publicacion } from './publicaciones.schema';
import { CrearPublicacionDTO } from './publicaciones.dto';
export declare class PublicacionesService {
    private publicacionModel;
    constructor(publicacionModel: Model<Publicacion>);
    crear(dto: CrearPublicacionDTO, usuarioId: string, imagenUrl?: string): Promise<import("mongoose").Document<unknown, {}, Publicacion, {}, import("mongoose").DefaultSchemaOptions> & Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    listar(orden?: string, usuarioId?: string, offset?: number, limit?: number): Promise<(import("mongoose").Document<unknown, {}, Publicacion, {}, import("mongoose").DefaultSchemaOptions> & Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    eliminar(publicacionId: string, usuarioId: string, perfil: string): Promise<{
        mensaje: string;
    }>;
    darMeGusta(publicacionId: string, usuarioId: string): Promise<{
        mensaje: string;
    }>;
    quitarMeGusta(publicacionId: string, usuarioId: string): Promise<{
        mensaje: string;
    }>;
}
