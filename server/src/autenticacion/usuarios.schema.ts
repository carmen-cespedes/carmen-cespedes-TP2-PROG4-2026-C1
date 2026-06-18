import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop()
  fechaNacimiento: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  nombreUsuario: string;  // username único

  @Prop()
  fotoPerfil: string;     // URL de la imagen guardada

  @Prop()
  telefono: string;

  @Prop({ default: 'usuario', enum: ['usuario', 'administrador'] })
  perfil: string;

  @Prop({ default: true })
  activo: boolean;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);