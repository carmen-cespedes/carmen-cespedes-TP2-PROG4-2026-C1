import { Model } from 'mongoose';
import { Publicacion } from './publicaciones.schema';
import { Comentario } from '../comentarios/comentarios.schema';
export declare class EstadisticasController {
    private publicacionModel;
    private comentarioModel;
    constructor(publicacionModel: Model<Publicacion>, comentarioModel: Model<Comentario>);
    publicacionesPorUsuario(desde: string, hasta: string): Promise<any[]>;
    comentarios(desde: string, hasta: string): Promise<number>;
    comentariosPorPublicacion(desde: string, hasta: string): Promise<any[]>;
}
