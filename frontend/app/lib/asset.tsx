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

    static fromJSON(json: any): Vendor {
        return new Vendor(
            json.id,
            json.name,
            json.vendor_id
        );
    }
}

export default interface VendorType {
    id: number;
    name: string;
    products: number[];
}

export class Vendor implements VendorType {
    id: number;
    name: string;
    products: number[];
  
    constructor(id:number,name: string, products: number[]) {
        this.id = id;
        this.name = name;
        this.products = products;
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
    const data = await fetch('http://localhost:8000/vendors/', {cache: 'no-store'});
    const vendors = await data.json();
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


function AssetCard(props) {
    return (
      <div
        key='{props.id}-vendor'
        className='bg-black bg-opacity-25'>
        <div className="w-fill text-center" key='{props.id}-asset_head'>
            <h1><b>#{props.id}</b> - {props.name}</h1>
        </div>
        <table
            className='ww-fill table-auto border-separate border-spacing-x-2 text-sm font-light text-surface'>
          <thead><tr><th className='bg-lime-700'>#</th><th className='bg-lime-700'>Name</th></tr></thead>
          <tbody>
            {props.products.map((data:JSON) => {
                var pobj = Product.fromJSON(data);
                return (
                    <tr><td>{pobj.id}</td><td>{pobj.name}</td></tr>
                );
            })
            }
          </tbody>
        </table>
      </div>
    );
  }