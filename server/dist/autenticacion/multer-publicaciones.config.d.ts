export declare const multerPublicacionesConfig: {
    storage: import("multer").StorageEngine;
    fileFilter: (_req: any, file: Express.Multer.File, cb: any) => void;
    limits: {
        fileSize: number;
    };
};
