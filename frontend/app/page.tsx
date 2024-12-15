import styles from '@/app/ui/home.module.css';
import NavLinks from "@/app/ui/nav-links";
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
    <NavLinks></NavLinks>
    <ProductCard products={products}></ProductCard>
    </>
);
}