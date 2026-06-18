import { UsuariosService } from './usuarios.service';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    listar(): Promise<(import("mongoose").Document<unknown, {}, import("../autenticacion/usuarios.schema").Usuario, {}, import("mongoose").DefaultSchemaOptions> & import("../autenticacion/usuarios.schema").Usuario & {
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
