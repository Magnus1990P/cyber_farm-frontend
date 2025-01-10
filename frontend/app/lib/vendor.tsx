import { Product } from "@/app/lib/product";

interface VendorType {
    id: number;
    name: string;
    products: Product[];
}

export class Vendor implements VendorType {
    id: number;
    name: string;
    products: Product[];
  
    constructor(id:number, name: string, products: JSON[]) {
        this.id = id;
        this.name = name;
        this.products = [];
        products.forEach(element => {
            var prod = Product.fromJSON(element);
            this.products.push(prod);
        });
    }

    static fromJSON(json: any): Vendor {
        return new Vendor(
            json.id,
            json.name,
            json.products
        );
    }
}