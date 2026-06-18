export declare class Usuario {
    email: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    descripcion: string;
    nombreUsuario: string;
    fotoPerfil: string;
    telefono: string;
    perfil: string;
    activo: boolean;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, any, any, Usuario>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    email?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contrasena?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    nombre?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    apellido?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fechaNacimiento?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    nombreUsuario?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fotoPerfil?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    telefono?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    perfil?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    activo?: import("mongoose").SchemaDefinitionProperty<boolean, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Usuario>;
