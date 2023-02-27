export interface UsuarioDataModel { 
    id: number;
    usuario: string;
    nombre: string;
    cargo: string;
    permisos: number[];
    token: string;
}