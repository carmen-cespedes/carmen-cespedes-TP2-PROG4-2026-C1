import { PublicacionesService } from './publicaciones.service';
import { CrearPublicacionDTO } from './publicaciones.dto';
export declare class PublicacionesController {
    private readonly publicacionesService;
    constructor(publicacionesService: PublicacionesService);
    crear(dto: CrearPublicacionDTO, req: any, imagen?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("./publicaciones.schema").Publicacion, {}, import("mongoose").DefaultSchemaOptions> & import("./publicaciones.schema").Publicacion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    listar(orden: string, usuarioId: string, offset: string, limit: string): Promise<(import("mongoose").Document<unknown, {}, import("./publicaciones.schema").Publicacion, {}, import("mongoose").DefaultSchemaOptions> & import("./publicaciones.schema").Publicacion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    eliminar(id: string, req: any): Promise<{
        mensaje: string;
    }>;
    darMeGusta(id: string, req: any): Promise<{
        mensaje: string;
    }>;
    quitarMeGusta(id: string, req: any): Promise<{
        mensaje: string;
    }>;
}
