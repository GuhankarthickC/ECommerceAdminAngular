import { Product } from "./Product";
import { Supplier } from "./Supplier";

export class ProductStorage {
    storageId: number;
    storageName: string;
    supplierId: number | null;
    productId: number | null;
    quantity: number | null;
    product: Product;
    supplier: Supplier;
}