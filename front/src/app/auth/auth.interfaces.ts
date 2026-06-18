export interface IRegistro {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  descripcion: string;
  email: string;
  nombreUsuario: string;
  contrasena: string;
  perfil?: string;
}

export interface ILogin {
  identifier: string;  // acepta email O nombreUsuario
  contrasena: string;
}

export interface IUsuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  perfil: string;
}