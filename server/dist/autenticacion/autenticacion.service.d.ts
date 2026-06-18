import { Model } from 'mongoose';
import { Usuario } from './usuarios.schema';
import { UsuarioRegistroDTO, UsuarioLoginDTO } from './usuarios.dto';
export declare class AutenticacionService {
    private usuarioModel;
    constructor(usuarioModel: Model<Usuario>);
    registrar(dto: UsuarioRegistroDTO, fotoPerfil?: string): Promise<{
        mensaje: string;
        token: string;
        usuario: any;
    }>;
    ingresar(dto: UsuarioLoginDTO): Promise<{
        token: string;
        usuario: {
            email: string;
            nombre: string;
            apellido: string;
            fechaNacimiento: string;
            descripcion: string;
            nombreUsuario: string;
            fotoPerfil: string;
            telefono: string;
            perfil: string;
            activo: boolean;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    autorizar(token: string): string | import("jsonwebtoken").JwtPayload;
    refrescar(token: string): {
        token: string;
    };
}
