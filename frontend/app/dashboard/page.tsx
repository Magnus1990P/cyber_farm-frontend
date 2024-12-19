import styles from '@/app/ui/home.module.css';
import {Vendor, Product} from "@/app/lib/definitions"
import ProductCard from '@/app/ui/products';

const vendors = [
  {id:0, name:"a", products:[0]},
  {id:1, name:"b", products:[1,2]},
  {id:2, name:"c", products:[]}]


const products = [
  {id:0, name:"a", vendor:0, companies:[]},
  {id:1, name:"b", vendor:1, products:[]},
  {id:2, name:"c", vendor:1, products:[]}]


export default function Page() {
  return (
    <>
    <div className='max-w-md mx-auto mb-5'>
      <div className="relative flex items-center w-full h-24 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-24 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search something.." /> 
      </div>
    </div>

    <div>
      <ProductCard products={products}></ProductCard>
    </div>
    </>
);
}