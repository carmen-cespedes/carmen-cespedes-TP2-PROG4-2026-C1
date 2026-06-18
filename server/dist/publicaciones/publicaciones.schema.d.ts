import { Types } from 'mongoose';
export declare class Publicacion {
    titulo: string;
    descripcion: string;
    imagen: string;
    usuario: Types.ObjectId;
    meGusta: Types.ObjectId[];
    eliminado: boolean;
}
export declare const PublicacionSchema: import("mongoose").Schema<Publicacion, import("mongoose").Model<Publicacion, any, any, any, any, any, Publicacion>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    titulo?: import("mongoose").SchemaDefinitionProperty<string, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imagen?: import("mongoose").SchemaDefinitionProperty<string, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    usuario?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    meGusta?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    eliminado?: import("mongoose").SchemaDefinitionProperty<boolean, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Publicacion>;
