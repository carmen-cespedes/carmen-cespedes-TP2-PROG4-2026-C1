import { ComentariosService } from './comentarios.service';
import { CrearComentarioDTO, EditarComentarioDTO } from './comentarios.dto';
export declare class ComentariosController {
    private readonly comentariosService;
    constructor(comentariosService: ComentariosService);
    crear(publicacionId: string, dto: CrearComentarioDTO, req: any): Promise<import("mongoose").Document<unknown, {}, import("./comentarios.schema").Comentario, {}, import("mongoose").DefaultSchemaOptions> & import("./comentarios.schema").Comentario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    editar(id: string, dto: EditarComentarioDTO, req: any): Promise<import("mongoose").Document<unknown, {}, import("./comentarios.schema").Comentario, {}, import("mongoose").DefaultSchemaOptions> & import("./comentarios.schema").Comentario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    listar(publicacionId: string, offset: string, limit: string): Promise<(import("mongoose").Document<unknown, {}, import("./comentarios.schema").Comentario, {}, import("mongoose").DefaultSchemaOptions> & import("./comentarios.schema").Comentario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
