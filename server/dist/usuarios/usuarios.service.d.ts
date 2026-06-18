import { Model } from 'mongoose';
import { Usuario } from '../autenticacion/usuarios.schema';
export declare class UsuariosService {
    private usuarioModel;
    constructor(usuarioModel: Model<Usuario>);
    listar(): Promise<(import("mongoose").Document<unknown, {}, Usuario, {}, import("mongoose").DefaultSchemaOptions> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    crear(datos: any): Promise<any>;
    deshabilitar(id: string): Promise<{
        mensaje: string;
    }>;
    habilitar(id: string): Promise<{
        mensaje: string;
    }>;
}
