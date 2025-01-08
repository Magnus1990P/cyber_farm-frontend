"use client";

import {AssetCard} from "@/app/ui/asset";

export default interface ProductType {
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

export async function AssetGrid() {
    const resp = await fetch('http://localhost:8000/vendors/', {cache: 'no-store'});
    if(resp.status == 404){
        return (
            <div
            className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
            key='vendors'>
                <h1>failed to retrieve contact data</h1>
            </div>
        )
    };
    const vendors = await resp.json();
    return (
        <div
            key='vendors' 
            className='flex grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
            {vendors.map((data:JSON) => {
                var vendor_object = Vendor.fromJSON(data);
                return (
                    <AssetCard 
                        id={vendor_object.id} 
                        name={vendor_object.name}
                        products={vendor_object.products}
                    />
                )
            })}
        </div>
    );
};

export async function VendorInfo(props: { vendor_id: string }) {
    const resp = await fetch("http://localhost:8000/vendors/"+props.vendor_id, {cache: 'force-cache'});
    if(resp.status == 404){
        return (
            <div
            className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
            key='vendors'>
                <h1>failed to retrieve contact data</h1>
            </div>
        )
    };
    const data = await resp.json();
    var vendor = Vendor.fromJSON(data);

    return (
    <>
        <p className="text-2xl font-mono font-bold">{vendor.id} - {vendor.name}</p>
        <p className="text-xl">Registered products:</p>
        <ul className="list-inside list-disc font-mono"
            key={vendor.id} >
            {
                vendor.products.map(product => {
                return <li className="list-disc" key={product.id}>{product.id} - {product.name}</li>;
            })
            }
        </ul>
    </>
    );
  }