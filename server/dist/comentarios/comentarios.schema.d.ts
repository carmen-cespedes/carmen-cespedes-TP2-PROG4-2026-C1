import { Types } from 'mongoose';
export declare class Comentario {
    publicacion: Types.ObjectId;
    usuario: Types.ObjectId;
    mensaje: string;
    modificado: boolean;
}
export declare const ComentarioSchema: import("mongoose").Schema<Comentario, import("mongoose").Model<Comentario, any, any, any, any, any, Comentario>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comentario, import("mongoose").Document<unknown, {}, Comentario, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Comentario & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    publicacion?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Comentario, import("mongoose").Document<unknown, {}, Comentario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    usuario?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Comentario, import("mongoose").Document<unknown, {}, Comentario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mensaje?: import("mongoose").SchemaDefinitionProperty<string, Comentario, import("mongoose").Document<unknown, {}, Comentario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    modificado?: import("mongoose").SchemaDefinitionProperty<boolean, Comentario, import("mongoose").Document<unknown, {}, Comentario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comentario & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Comentario>;
