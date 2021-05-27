import { UnidadeMedida } from '../enums/unidade-medida.enum';

export interface Product {
    name:string;
    quantidade:number;
    unidadeMedida: UnidadeMedida
}