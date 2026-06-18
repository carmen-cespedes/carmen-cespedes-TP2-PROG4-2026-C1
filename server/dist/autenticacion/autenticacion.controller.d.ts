import { AutenticacionService } from './autenticacion.service';
import { UsuarioRegistroDTO, UsuarioLoginDTO } from './usuarios.dto';
export declare class AutenticacionController {
    private readonly autenticacionService;
    constructor(autenticacionService: AutenticacionService);
    registrar(dto: UsuarioRegistroDTO, foto?: Express.Multer.File): Promise<{
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
    autorizar(req: any): any;
    refrescar(req: any): {
        token: string;
    };
}
