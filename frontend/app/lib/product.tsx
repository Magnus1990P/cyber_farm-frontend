interface ProductType {
    id: number;
    name: string;
    vendor_id: number;
}

export class Product implements ProductType {
    id: number;
    name: string;
    vendor_id: number;
  
    constructor(id:number,name: string, vendor_id: number) {
        this.id = id;
        this.name = name;
        this.vendor_id = vendor_id;
    }

    static fromJSON(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.vendor_id
        );
    }
}

